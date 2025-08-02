#!/usr/bin/env bash
# Build script for Render deployment

set -e

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run TypeScript compilation and Vite build
echo "Building application..."
npm run build

echo "Build completed successfully!"

# List the contents of dist directory for verification
echo "Contents of dist directory:"
ls -la dist/