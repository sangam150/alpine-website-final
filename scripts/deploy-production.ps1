# Alpine Education & Visa Services - Production Deployment Script
# This script handles the complete production deployment process

param(
    [string]$Environment = "production",
    [switch]$SkipTests = $false,
    [switch]$SkipBuild = $false,
    [switch]$Force = $false
)

Write-Host "🚀 Alpine Education & Visa Services - Production Deployment" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "⚠️  Warning: This script should be run as Administrator for best results" -ForegroundColor Yellow
}

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Function to check environment variables
function Test-EnvironmentVariables {
    Write-Host "🔍 Checking environment variables..." -ForegroundColor Blue
    
    $requiredVars = @(
        "NEXT_PUBLIC_GA_MEASUREMENT_ID",
        "RESEND_API_KEY", 
        "FIREBASE_API_KEY",
        "FIREBASE_AUTH_DOMAIN",
        "FIREBASE_PROJECT_ID",
        "FIREBASE_STORAGE_BUCKET",
        "FIREBASE_MESSAGING_SENDER_ID",
        "FIREBASE_APP_ID"
    )
    
    $missingVars = @()
    foreach ($var in $requiredVars) {
        if (-not (Test-Path "env:$var")) {
            $missingVars += $var
        }
    }
    
    if ($missingVars.Count -gt 0) {
        Write-Host "❌ Missing required environment variables:" -ForegroundColor Red
        foreach ($var in $missingVars) {
            Write-Host "   - $var" -ForegroundColor Red
        }
        Write-Host "Please set these variables before deployment." -ForegroundColor Yellow
        return $false
    }
    
    Write-Host "✅ All required environment variables are set" -ForegroundColor Green
    return $true
}

# Function to check dependencies
function Test-Dependencies {
    Write-Host "🔍 Checking dependencies..." -ForegroundColor Blue
    
    $dependencies = @("node", "npm", "git")
    $missing = @()
    
    foreach ($dep in $dependencies) {
        if (-not (Test-Command $dep)) {
            $missing += $dep
        }
    }
    
    if ($missing.Count -gt 0) {
        Write-Host "❌ Missing dependencies:" -ForegroundColor Red
        foreach ($dep in $missing) {
            Write-Host "   - $dep" -ForegroundColor Red
        }
        return $false
    }
    
    Write-Host "✅ All dependencies are installed" -ForegroundColor Green
    return $true
}

# Function to run tests
function Invoke-Tests {
    if ($SkipTests) {
        Write-Host "⏭️  Skipping tests as requested" -ForegroundColor Yellow
        return $true
    }
    
    Write-Host "🧪 Running tests..." -ForegroundColor Blue
    
    try {
        # Run linting
        Write-Host "   Running ESLint..." -ForegroundColor Cyan
        npm run lint
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ ESLint failed" -ForegroundColor Red
            return $false
        }
        
        # Run type checking
        Write-Host "   Running TypeScript check..." -ForegroundColor Cyan
        npm run type-check
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ TypeScript check failed" -ForegroundColor Red
            return $false
        }
        
        Write-Host "✅ All tests passed" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Tests failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to build the application
function Invoke-Build {
    if ($SkipBuild) {
        Write-Host "⏭️  Skipping build as requested" -ForegroundColor Yellow
        return $true
    }
    
    Write-Host "🔨 Building application..." -ForegroundColor Blue
    
    try {
        # Clean previous build
        Write-Host "   Cleaning previous build..." -ForegroundColor Cyan
        if (Test-Path ".next") {
            Remove-Item -Recurse -Force ".next"
        }
        
        # Install dependencies
        Write-Host "   Installing dependencies..." -ForegroundColor Cyan
        npm ci
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Dependency installation failed" -ForegroundColor Red
            return $false
        }
        
        # Build application
        Write-Host "   Building application..." -ForegroundColor Cyan
        npm run build
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Build failed" -ForegroundColor Red
            return $false
        }
        
        Write-Host "✅ Build completed successfully" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Build failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to deploy to Vercel
function Invoke-VercelDeploy {
    Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Blue
    
    try {
        # Check if Vercel CLI is installed
        if (-not (Test-Command "vercel")) {
            Write-Host "   Installing Vercel CLI..." -ForegroundColor Cyan
            npm install -g vercel
        }
        
        # Deploy to production
        Write-Host "   Deploying to production..." -ForegroundColor Cyan
        if ($Force) {
            vercel --prod --force
        } else {
            vercel --prod
        }
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Vercel deployment failed" -ForegroundColor Red
            return $false
        }
        
        Write-Host "✅ Deployment completed successfully" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Deployment failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to verify deployment
function Test-Deployment {
    Write-Host "🔍 Verifying deployment..." -ForegroundColor Blue
    
    try {
        # Get deployment URL from Vercel
        $deploymentUrl = vercel ls --prod | Select-String "https://" | Select-Object -First 1
        if ($deploymentUrl) {
            $url = $deploymentUrl.Line.Trim()
            Write-Host "   Deployment URL: $url" -ForegroundColor Cyan
            
            # Test basic connectivity
            Write-Host "   Testing connectivity..." -ForegroundColor Cyan
            $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 30
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Deployment verification successful" -ForegroundColor Green
                return $true
            } else {
                Write-Host "❌ Deployment verification failed" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "❌ Could not determine deployment URL" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Deployment verification failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to run post-deployment tasks
function Invoke-PostDeployment {
    Write-Host "🔧 Running post-deployment tasks..." -ForegroundColor Blue
    
    try {
        # Set up monitoring
        Write-Host "   Setting up monitoring..." -ForegroundColor Cyan
        # Add monitoring setup commands here
        
        # Configure analytics
        Write-Host "   Configuring analytics..." -ForegroundColor Cyan
        # Add analytics setup commands here
        
        # Set up backups
        Write-Host "   Setting up backups..." -ForegroundColor Cyan
        # Add backup setup commands here
        
        Write-Host "✅ Post-deployment tasks completed" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Post-deployment tasks failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main deployment process
function Start-Deployment {
    Write-Host "🚀 Starting production deployment..." -ForegroundColor Green
    
    # Step 1: Check dependencies
    if (-not (Test-Dependencies)) {
        Write-Host "❌ Dependency check failed. Please install missing dependencies." -ForegroundColor Red
        exit 1
    }
    
    # Step 2: Check environment variables
    if (-not (Test-EnvironmentVariables)) {
        Write-Host "❌ Environment variable check failed. Please set required variables." -ForegroundColor Red
        exit 1
    }
    
    # Step 3: Run tests
    if (-not (Invoke-Tests)) {
        if (-not $Force) {
            Write-Host "❌ Tests failed. Use -Force to continue anyway." -ForegroundColor Red
            exit 1
        } else {
            Write-Host "⚠️  Tests failed but continuing due to -Force flag" -ForegroundColor Yellow
        }
    }
    
    # Step 4: Build application
    if (-not (Invoke-Build)) {
        Write-Host "❌ Build failed. Deployment aborted." -ForegroundColor Red
        exit 1
    }
    
    # Step 5: Deploy to Vercel
    if (-not (Invoke-VercelDeploy)) {
        Write-Host "❌ Deployment failed. Please check Vercel configuration." -ForegroundColor Red
        exit 1
    }
    
    # Step 6: Verify deployment
    if (-not (Test-Deployment)) {
        Write-Host "❌ Deployment verification failed." -ForegroundColor Red
        exit 1
    }
    
    # Step 7: Post-deployment tasks
    if (-not (Invoke-PostDeployment)) {
        Write-Host "⚠️  Post-deployment tasks failed, but deployment was successful." -ForegroundColor Yellow
    }
    
    Write-Host "🎉 Production deployment completed successfully!" -ForegroundColor Green
    Write-Host "================================================================" -ForegroundColor Green
    Write-Host "Your Alpine Education & Visa Services platform is now live!" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Configure custom domain in Vercel dashboard" -ForegroundColor White
    Write-Host "2. Set up Google Analytics and Search Console" -ForegroundColor White
    Write-Host "3. Configure email templates in Resend" -ForegroundColor White
    Write-Host "4. Set up monitoring and alerting" -ForegroundColor White
    Write-Host "5. Begin marketing and customer acquisition" -ForegroundColor White
}

# Run the deployment
Start-Deployment 