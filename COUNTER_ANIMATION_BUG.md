# COUNTER ANIMATION BUG - PRODUCTION ONLY

## Status: UNRESOLVED
**Priority**: Medium
**Date**: 2025-09-30
**Affects**: About page counter animations

## Problem Description
Counter animations on the About page work perfectly in local development but fail completely in production (Netlify deployment).

### Symptoms
- ✅ Works: Local development (`pnpm dev`)
- ❌ Fails: Production build on Netlify
- ❌ Fails: Even in incognito windows (not a caching issue)
- The counters remain at "0" and never animate to their target values

### Expected Behavior
Counters should animate from 0 to their target values:
- Drawer Types: 0 → 4
- Cross-Device Support: 0 → 6
- Calculated Precision: 0 → 99.9

## Technical Details

### Component Location
- File: `/src/components/CounterComponent.astro`
- Used in: `/src/content/about/index.mdx`
- Rendered via: `/src/pages/about.astro`

### Original Template Implementation
The alfadev-astro-starter template uses:
```javascript
<script is:inline>
  document.addEventListener("astro:page-load", () => {
    const counters = document.querySelectorAll(".count");
    const speed = 500;
    counters.forEach((counter) => {
      const animate = () => {
        const value = +counter.getAttribute("aria-valuenow");
        const data = +counter.innerText;
        const time = value / speed;
        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        } else {
          counter.innerText = value;
        }
      };
      animate();
    });
  });
</script>
```

### Attempted Solutions (All Failed)

1. **astro:after-swap event** (like dark mode fix)
   - Added `astro:after-swap` listener
   - Result: No change

2. **Immediate execution** (like theme toggle)
   - Removed event listeners, ran `initCounters()` immediately
   - Result: No change

3. **Named function approach**
   - Extracted logic into `initCounters()` function
   - Result: No change

4. **DOMContentLoaded check**
   - Added `document.readyState` check
   - Added `DOMContentLoaded` event listener
   - Result: No change

5. **Removed is:inline**
   - Let Astro bundle the script
   - Result: TypeScript errors, had to revert

6. **Hybrid approach**
   - Combined DOMContentLoaded + astro:after-swap + immediate execution
   - Result: No change

### Current Implementation (Still Broken)
```javascript
<script is:inline>
  const initCounters = () => {
    const counters = document.querySelectorAll(".count");
    if (counters.length === 0) return;
    
    const speed = 500;
    counters.forEach((counter) => {
      const animate = () => {
        const value = +counter.getAttribute("aria-valuenow");
        const data = +counter.innerText;
        const time = value / speed;
        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        } else {
          counter.innerText = value;
        }
      };
      animate();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }

  document.addEventListener("astro:after-swap", initCounters);
</script>
```

## Key Observations

1. **Works locally, fails in production** - Classic timing/bundling issue
2. **Dark mode toggle works** - Uses similar pattern but in `Base.astro` head
3. **Theme script location** - In `<head>`, runs before body
4. **Counter script location** - In component body, after elements
5. **MDX rendering** - Component is used inside MDX content

## Possible Root Causes (To Investigate)

1. **Script bundling differences**
   - Production minification might affect script execution
   - Astro view transitions might handle inline scripts differently in production

2. **MDX component rendering timing**
   - Script might run before MDX content is fully rendered
   - Component scripts in MDX might have different lifecycle

3. **Astro view transitions**
   - Production build might handle view transitions differently
   - Script might not re-execute on client-side navigation

4. **Script placement**
   - Theme script is in `<head>`, counter script is in component
   - Might need to move script to a different location

5. **is:inline directive**
   - Might be causing issues with Astro's script processing
   - But removing it causes TypeScript errors

## Next Steps to Try

1. **Move script to Base.astro**
   - Put counter initialization in `<head>` like theme script
   - Use global function that checks for counter elements

2. **Use client:load directive**
   - Convert to a React/Preact component with `client:load`
   - Ensures proper hydration timing

3. **Add console.log debugging**
   - Deploy with console logs to see what's happening in production
   - Check if script runs, if elements exist, if animation starts

4. **Check production HTML**
   - Download production HTML and compare with local
   - See if script is being transformed/minified incorrectly

5. **Try different event**
   - Use `window.onload` instead of DOMContentLoaded
   - Try `requestAnimationFrame` for timing

6. **Intersection Observer**
   - Trigger animation when counters come into viewport
   - More reliable for dynamically rendered content

## Related Working Code

### Dark Mode Toggle (WORKS in production)
Location: `/src/layouts/Base.astro` lines 271-298
```javascript
<script is:inline>
  const setTheme = () => { /* ... */ };
  setTheme();
  document.addEventListener("astro:after-swap", setTheme);
</script>
```

### Dropdown Menu (WORKS in production)
Location: `/src/layouts/partials/Header.astro` lines 121-144
```javascript
<script is:inline>
  function initDropdownListeners() { /* ... */ }
  document.addEventListener("astro:page-load", () => {
    initDropdownListeners();
  });
</script>
```

## Commits Related to This Issue
- `37457a8` - Initial fix attempt with astro:after-swap
- `2b4ba18` - Immediate execution approach
- `fb51ee7` - DOM ready handling
- `651af4e` - Demo links feature (unrelated but in same session)
- `5fbbe09` - Named function approach
- `831f40f` - Theme script pattern
- `f5cb546` - DOMContentLoaded check (current)

## References
- Original template: https://github.com/diego-alfadev/alfadev-astro-starter
- Dark mode fix memory: fbaadf34-02cd-4e6c-bb72-b14571b62b32
- Astro view transitions docs: https://docs.astro.build/en/guides/view-transitions/
