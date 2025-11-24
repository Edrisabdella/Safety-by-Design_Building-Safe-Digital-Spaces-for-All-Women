#!/bin/bash

echo "🚀 Starting SafeSpace Backend Build Process on Render..."

# Navigate to backend directory
cd backend

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
cat > .env << EOL
NODE_ENV=production
MONGODB_URI=mongodb+srv://edrisabdella178_db_user:<saf***>@safety-by-design.fg8ive4.mongodb.net/safespace?appName=SAFETY-BY-DESIGN
JWT_SECRET=safespace123
JWT_EXPIRES_IN=90d
FRONTEND_URL=https://safespace-frontend.onrender.com
CLOUDINARY_CLOUD_NAME=safespace
CLOUDINARY_API_KEY=safespace123
CLOUDINARY_API_SECRET=safespace123
EMAIL_HOST=safespace.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=edrisabdella178@gmail.com
EMAIL_PASSWORD=safespaceapp123
EMAIL_FROM=SafeSpace <noreply@safespace.com>
PORT=10000
EOL

echo "✅ Backend build completed successfully!"
echo "📝 Environment variables configured"
echo "🐳 Ready for deployment..."