#!/bin/bash

echo "🚀 Starting SafeSpace Frontend Build Process on Render..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

# Create production environment file
echo "🔧 Creating production environment configuration..."
cat > .env.production << EOL
VITE_API_URL=https://safespace-backend.onrender.com
VITE_APP_NAME=SafeSpace
VITE_NODE_ENV=production
EOL

# Build the application
echo "🏗 Building React application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Verify build output
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output: dist/"
    echo "📊 Build size:"
    du -sh dist/
else
    echo "❌ Build output not found"
    exit 1
fi

echo "🎉 Frontend build process completed!"