# Elite Fantasy League

A fantasy sports league application built with React, TypeScript, and Vite.

## Deployment on Render

This project is configured for easy deployment on Render using the included `render.yaml` file.

### Automatic Deployment

1. Push your code to a GitHub repository
2. Connect your GitHub repository to Render
3. Render will automatically detect the `render.yaml` configuration and deploy your app

### Manual Deployment

If you prefer to deploy manually:

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Environment

- Node.js version: 20.11.0 (specified in `.node-version`)
- Build output: `dist` directory

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```