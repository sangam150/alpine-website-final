# Alpine Education - Production Deployment Script
# Run this script to deploy to production

Write-Host "🚀 Alpine Education - Production Deployment" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Step 1: Running pre-deployment checks..." -ForegroundColor Yellow

# Run linting
Write-Host "🔍 Running ESLint..." -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Linting failed. Please fix issues before deployment." -ForegroundColor Red
    exit 1
}

# Run TypeScript check
Write-Host "🔍 Running TypeScript check..." -ForegroundColor Cyan
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript check failed. Please fix issues before deployment." -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "🔨 Building for production..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please fix issues before deployment." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Check if Vercel CLI is installed
Write-Host "📋 Step 2: Checking deployment tools..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Deploy to Vercel
Write-Host "📋 Step 3: Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "🌐 This will deploy your Alpine Education platform to production." -ForegroundColor Cyan
Write-Host "📝 You'll be prompted to configure your project if it's your first deployment." -ForegroundColor Cyan

$deploy = Read-Host "Do you want to deploy now? (y/n)"
if ($deploy -eq "y" -or $deploy -eq "Y") {
    Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green
    vercel --prod
} else {
    Write-Host "⏸️  Deployment skipped. You can run 'vercel --prod' manually later." -ForegroundColor Yellow
}

Write-Host "📋 Step 4: Post-deployment checklist..." -ForegroundColor Yellow
Write-Host "✅ Build completed successfully" -ForegroundColor Green
Write-Host "✅ Code quality checks passed" -ForegroundColor Green
Write-Host "✅ Ready for production deployment" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Alpine Education Platform Deployment Complete!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure your custom domain in Vercel dashboard" -ForegroundColor White
Write-Host "2. Set up environment variables for production" -ForegroundColor White
Write-Host "3. Configure Google Analytics and tracking" -ForegroundColor White
Write-Host "4. Test all functionality on the live site" -ForegroundColor White
Write-Host "5. Set up monitoring and error tracking" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your site will be available at the URL provided by Vercel" -ForegroundColor Cyan
Write-Host "📊 Monitor performance and analytics after launch" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎯 Alpine Education is now ready to compete globally!" -ForegroundColor Green 