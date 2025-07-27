# Alpine Education Environment Variables Setup for Vercel
# Run this script to set up all required environment variables

Write-Host "Setting up environment variables for Alpine Education website..." -ForegroundColor Green

# Firebase Configuration
Write-Host "Setting up Firebase environment variables..." -ForegroundColor Yellow
npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
npx vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
npx vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
npx vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production
npx vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production
npx vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production
npx vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production

# Analytics
Write-Host "Setting up Analytics environment variables..." -ForegroundColor Yellow
npx vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production

# Admin Configuration
Write-Host "Setting up Admin environment variables..." -ForegroundColor Yellow
npx vercel env add ADMIN_EMAIL production
npx vercel env add ADMIN_PASSWORD production

Write-Host "Environment variables setup complete!" -ForegroundColor Green
Write-Host "You can now deploy with: npx vercel --prod" -ForegroundColor Cyan 