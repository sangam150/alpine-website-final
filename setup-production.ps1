# Alpine Education - Production Setup Script
# This script helps you set up the production environment

Write-Host "🚀 Alpine Education - Production Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking Vercel CLI installation..." -ForegroundColor Yellow
try {
    $vercelVersion = npx vercel --version 2>$null
    Write-Host "✅ Vercel CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

Write-Host ""
Write-Host "📋 Production Setup Checklist:" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Environment Variables Setup" -ForegroundColor Yellow
Write-Host "   - Go to Vercel Dashboard -> Your Project -> Settings -> Environment Variables" -ForegroundColor White
Write-Host "   - Add all required environment variables (see POST_DEPLOYMENT_SETUP.md)" -ForegroundColor White
Write-Host ""

Write-Host "2. Domain Configuration" -ForegroundColor Yellow
Write-Host "   - Add custom domain in Vercel Dashboard" -ForegroundColor White
Write-Host "   - Configure DNS records with your domain provider" -ForegroundColor White
Write-Host ""

Write-Host "3. Testing Checklist" -ForegroundColor Yellow
Write-Host "   - Test all forms and functionality" -ForegroundColor White
Write-Host "   - Verify mobile responsiveness" -ForegroundColor White
Write-Host "   - Check payment gateway integration" -ForegroundColor White
Write-Host ""

Write-Host "4. Analytics Setup" -ForegroundColor Yellow
Write-Host "   - Configure Google Analytics" -ForegroundColor White
Write-Host "   - Set up Google Search Console" -ForegroundColor White
Write-Host "   - Configure Vercel Analytics" -ForegroundColor White
Write-Host ""

# Open important files
Write-Host ""
Write-Host "📁 Opening important files..." -ForegroundColor Cyan

$files = @(
    "POST_DEPLOYMENT_SETUP.md",
    "ENVIRONMENT_SETUP_GUIDE.md",
    "FINAL_LAUNCH_CHECKLIST.md"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   Opening $file..." -ForegroundColor White
        Start-Process $file
    } else {
        Write-Host "   ❌ $file not found" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🌐 Production URL:" -ForegroundColor Green
Write-Host "   https://alpine-website-final-3tdjcy8v4-sangams-projects-9468acfa.vercel.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔧 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Configure environment variables in Vercel" -ForegroundColor White
Write-Host "   2. Set up custom domain" -ForegroundColor White
Write-Host "   3. Test all functionality" -ForegroundColor White
Write-Host "   4. Launch marketing campaigns" -ForegroundColor White
Write-Host ""

Write-Host "✅ Setup script completed!" -ForegroundColor Green
Write-Host "   Review POST_DEPLOYMENT_SETUP.md for detailed instructions" -ForegroundColor White
Write-Host ""

# Ask if user wants to open Vercel dashboard
$openVercel = Read-Host "Do you want to open Vercel Dashboard? (y/n)"
if ($openVercel -eq "y" -or $openVercel -eq "Y") {
    Start-Process "https://vercel.com/dashboard"
}

Write-Host ""
Write-Host "🎉 Alpine Education is ready for launch!" -ForegroundColor Green 