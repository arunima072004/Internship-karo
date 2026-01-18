# Deployment Guide

## Netlify Deployment

This project is configured for easy deployment on Netlify.

### Automatic Deployment

1. **Connect Repository**: Connect your GitHub repository to Netlify
2. **Build Settings**: Netlify will automatically detect the `netlify.toml` configuration
3. **Deploy**: The build will run automatically

### Manual Configuration (if needed)

If you need to configure manually in Netlify dashboard:

- **Build command**: `npm run build`
- **Publish directory**: `packages/frontend/dist`
- **Node version**: `18`

### Build Process

The build process:
1. Installs dependencies in the frontend package
2. Runs TypeScript compilation (`tsc`)
3. Builds the Vite application
4. Outputs to `packages/frontend/dist`

### Environment Variables

If you need to set environment variables in Netlify:
- `VITE_API_URL`: Backend API URL (optional, defaults to localhost for development)

### Troubleshooting

If the build fails:
1. Check that TypeScript is installed in `packages/frontend/package.json`
2. Verify the build works locally with `npm run build`
3. Check Netlify build logs for specific errors

### SPA Routing

The `netlify.toml` includes redirect rules for single-page application routing, so all routes will work correctly.