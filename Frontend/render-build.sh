#!/bin/bash

echo "🚀 Starting SafeSpace Frontend Build on Render..."

# Set proper permissions
chmod -R 755 node_modules/.bin/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create production environment
cat > .env.production << EOL
VITE_API_URL=https://safespace-backend.onrender.com
VITE_APP_NAME=SafeSpace
EOL

# Build the application
echo "🏗 Building application..."
npm run build

# Verify build
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    ls -la dist/
else
    echo "❌ Build failed - no dist directory"
    exit 1
fi
