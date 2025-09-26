# FocusUI Deployment Guide

## Overview

This project uses GitHub + Netlify for continuous deployment with the following structure:

- **Main Site**: `https://focusui.io` (currently redirects to demo)
- **Demo**: `https://focusui.io/demo` (FocusUI interactive demo)
- **Repository**: GitHub repository with README.md accessible
- **Deployment**: Automatic via Netlify when pushing to main branch

## Current Structure

```text
/
├── index.html          # Main site (currently redirects to /demo)
├── demo/               # FocusUI demo application
│   ├── index.html      # Demo entry point
│   ├── style.css       # Demo styles
│   ├── script.js       # Demo functionality
│   └── FocusUI-eventhorizon.png
├── netlify.toml        # Netlify configuration
├── _redirects          # Redirect rules
├── README.md           # GitHub documentation (not served on website)
└── DEPLOYMENT.md       # This file
```

## Deployment Workflow

### Initial Setup (One-time)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial deployment setup"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - "Add new site" → "Import from Git"
   - Connect your GitHub repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.` (root)
   - Deploy!

3. **Configure Custom Domain**:
   - In Netlify dashboard: Site settings → Domain management
   - Add custom domain: `focusui.io`
   - Configure DNS in Cloudflare (see DNS Configuration section below)

## DNS Configuration (Cloudflare)

After adding your custom domain in Netlify, configure these DNS records in your Cloudflare dashboard:

### Required DNS Records

1. **Root Domain (focusui.io)**:

   ```dns
   Type: A
   Name: @
   Content: 75.2.60.5
   Proxy status: Proxied (orange cloud)
   TTL: Auto
   ```

2. **WWW Subdomain**:

   ```dns
   Type: CNAME
   Name: www
   Content: your-site-name.netlify.app
   Proxy status: Proxied (orange cloud)
   TTL: Auto
   ```

### Cloudflare Settings

1. **SSL/TLS Mode**: Set to "Full (strict)" for best security
2. **Always Use HTTPS**: Enable this setting
3. **Automatic HTTPS Rewrites**: Enable
4. **Edge Certificates**: Ensure Universal SSL is active

### Verification Steps

1. **DNS Propagation**: Use `dig focusui.io` or online tools to verify
2. **SSL Chain**: Check that both Cloudflare and Netlify SSL are working
3. **Redirect Test**: Verify `focusui.io` → `focusui.io/demo` works
4. **Performance**: Cloudflare CDN should improve global load times

### Troubleshooting

- **522 Error**: Check that Netlify SSL is provisioned first
- **Redirect Loops**: Ensure Cloudflare SSL mode is "Full (strict)"
- **Slow Propagation**: Cloudflare usually propagates within minutes

### Future Development Workflow

#### For Demo Updates (`/demo/`)

1. Make changes to files in `/demo/` directory
2. Test locally if needed
3. Commit and push:

   ```bash
   git add demo/
   git commit -m "Update demo: [description]"
   git push origin main
   ```

4. Netlify automatically deploys changes

#### For Main Site Content (`/`)

When ready to add main site content:

1. **Replace redirect with main content**:
   - Update `/index.html` with actual main site content
   - Remove the redirect meta tag and JavaScript

2. **Update Netlify configuration**:
   - Edit `netlify.toml`
   - Remove or comment out the root redirect:

   ```toml
   # [[redirects]]
   #   from = "/"
   #   to = "/demo/"
   #   status = 302
   #   force = false
   ```

3. **Add additional pages**:
   - Create new HTML files in root directory
   - Update navigation as needed
   - Demo remains accessible at `/demo/`

## URL Structure

- `focusui.io` → Main website (currently redirects to demo)
- `focusui.io/demo` → FocusUI interactive demo
- `focusui.io/about` → Future: About page
- `focusui.io/docs` → Future: Documentation
- `focusui.io/contact` → Future: Contact page

## Notes

- **README.md** is blocked from web serving (GitHub only)
- **Demo is independent** - can be updated without affecting main site
- **Automatic SSL** via Let's Encrypt
- **CDN** and caching configured for optimal performance
- **Security headers** configured for production

## Troubleshooting deployment

- **Demo not loading**: Check `/demo/index.html` exists and is valid
- **Redirect not working**: Verify `netlify.toml` redirect configuration
- **404 errors**: Check file paths and case sensitivity
- **CSS/JS not loading**: Verify relative paths in demo files
