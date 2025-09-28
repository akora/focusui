# FocusUI Deployment Guide

## Overview

FocusUI is now a modern **Astro-powered website** with integrated demos, deployed via GitHub + Netlify:

- **Main Site**: Professional Astro website with FocusUI branding
- **Interactive Demo**: `/demo/index.html` - Full FocusUI system showcase
- **Cross-Device Demo**: `/demo-cross-device/index.html` - iPad Safari compatibility demo
- **Repository**: GitHub with automatic Netlify deployment
- **Build Process**: pnpm + Astro static site generation

## Current Structure

```text
/
├── src/                    # Astro source files
│   ├── components/         # Reusable Astro/React components
│   ├── content/           # Markdown content files
│   ├── layouts/           # Page layout templates
│   ├── pages/             # Site pages (index, about, docs, etc.)
│   └── styles/            # SCSS stylesheets
├── public/                # Static assets
│   ├── demo/              # Interactive FocusUI demo
│   ├── demo-cross-device/ # Cross-device compatibility demo
│   └── favicons/          # FocusUI branding assets
├── dist/                  # Built site (generated)
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies and scripts
├── pnpm-lock.yaml         # Package lock file
└── astro.config.mjs       # Astro configuration
```

## Deployment Workflow

### Initial Setup (One-time)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Deploy FocusUI Astro website"
   git push origin main
   ```

2. **Update Existing Netlify Site**:
   - Go to your existing Netlify project dashboard
   - Navigate to: **Site settings** → **Build & deploy** → **Build settings**
   - Click **Edit settings** and update:
     - **Build command**: `pnpm run build`
     - **Publish directory**: `dist`
     - **Node version**: `18` (should already be set)
   - Save settings and trigger a new deploy

## Development Workflow

### Local Development

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development server**:

   ```bash
   pnpm run dev
   ```

   - Site available at: `http://localhost:4322`
   - Hot reload enabled for all changes

3. **Build for production**:

   ```bash
   pnpm run build
   ```

   - Generates static site in `/dist/` directory
   - Includes all demos and assets

### Content Updates

#### Website Content (`/src/content/`)

1. **Homepage**: Edit `/src/content/homepage/index.md`
2. **About Page**: Edit `/src/content/about/index.mdx`
3. **Documentation**: Edit `/src/pages/documentation.astro`
4. **Changelog**: Edit `/src/content/changelog/index.mdx`

#### Demo Updates (`/public/demo/`)

1. **Interactive Demo**: Edit files in `/public/demo/`
2. **Cross-Device Demo**: Edit files in `/public/demo-cross-device/`
3. **No build required** - demos are static files

#### Configuration

1. **Site Settings**: Edit `/src/config/config.json`
2. **Navigation**: Edit `/src/config/menu.json`
3. **Social Links**: Edit `/src/config/social.json`

### Deployment Process

1. **Make changes** to any files
2. **Test locally**:

   ```bash
   pnpm run dev
   ```

3. **Build and verify**:

   ```bash
   pnpm run build
   ```

4. **Commit and push**:

   ```bash
   git add .
   git commit -m "Update: [description]"
   git push origin main
   ```

5. **Netlify automatically builds and deploys**

## Site Structure

### Live URLs

- `focusui.io` → Homepage with FocusUI showcase
- `focusui.io/features` → Feature highlights
- `focusui.io/documentation` → Implementation guide
- `focusui.io/changelog` → Development timeline
- `focusui.io/about` → About FocusUI
- `focusui.io/demo/index.html` → Interactive demo
- `focusui.io/demo-cross-device/index.html` → Cross-device demo

### Technical Features

- **Astro Framework**: Modern static site generation
- **React Components**: Interactive elements
- **Markdown Content**: Easy content management
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **SEO Optimized**: Automatic sitemap, meta tags
- **PWA Ready**: Web app manifest, iOS icons
- **Performance**: Optimized builds, CDN-ready

## Troubleshooting

### Build Issues

- **pnpm not found**: Ensure pnpm is installed globally
- **Build fails**: Check TypeScript errors in terminal
- **Missing dependencies**: Run `pnpm install`

### Demo Issues

- **Demo not loading**: Verify files exist in `/public/demo/`
- **404 on demo links**: Ensure links use `/demo/index.html`
- **Styling issues**: Check CSS file paths in demo HTML

### Deployment Issues

- **Build command**: Must be `pnpm run build`
- **Publish directory**: Must be `dist`
- **Node version**: Should be `18`
- **Environment**: No additional variables needed

## Performance Notes

- **Build time**: ~3-5 seconds
- **Bundle size**: ~11.52 kB CSS, optimized JS
- **SEO**: Automatic sitemap generation
- **Caching**: Optimized headers for static assets
- **Security**: CSP and security headers configured
