# Alpine Education & Visa Services - Final Production Deployment Script
# This script automates the complete deployment process for the production launch

param(
    [switch]$SkipTests,
    [switch]$SkipBuild,
    [switch]$ForceDeploy
)

# Configuration
$ProjectName = "alpine-education"
$Domain = "alpineeducation.com"
$Environment = "production"

# Colors for output
$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"
$Blue = "Blue"

function Write-Status {
    param(
        [string]$Message,
        [string]$Color = "White",
        [string]$Status = ""
    )
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    $statusText = if ($Status) { " [$Status]" } else { "" }
    Write-Host "[$timestamp]$statusText $Message" -ForegroundColor $Color
}

function Test-Command {
    param([string]$Command)
    
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

function Test-EnvironmentVariables {
    Write-Status "Checking environment variables..." $Blue
    
    $requiredVars = @(
        "NEXT_PUBLIC_FIREBASE_API_KEY",
        "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
        "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
        "FIREBASE_PRIVATE_KEY",
        "FIREBASE_CLIENT_EMAIL",
        "RESEND_API_KEY",
        "OPENAI_API_KEY",
        "NEXT_PUBLIC_GA_ID"
    )
    
    $missingVars = @()
    
    foreach ($var in $requiredVars) {
        if (-not (Get-Item "env:$var" -ErrorAction SilentlyContinue)) {
            $missingVars += $var
        }
    }
    
    if ($missingVars.Count -gt 0) {
        Write-Status "Missing environment variables:" $Red
        foreach ($var in $missingVars) {
            Write-Status "  - $var" $Red
        }
        return $false
    }
    
    Write-Status "All environment variables are configured" $Green
    return $true
}

function Test-Dependencies {
    Write-Status "Checking dependencies..." $Blue
    
    $dependencies = @("node", "npm", "git")
    
    foreach ($dep in $dependencies) {
        if (-not (Test-Command $dep)) {
            Write-Status "Missing dependency: $dep" $Red
            return $false
        }
    }
    
    Write-Status "All dependencies are installed" $Green
    return $true
}

function Invoke-Tests {
    if ($SkipTests) {
        Write-Status "Skipping tests as requested" $Yellow
        return $true
    }
    
    Write-Status "Running tests..." $Blue
    
    try {
        # Run linting
        Write-Status "Running ESLint..." $Blue
        npm run lint
        
        # Run type checking
        Write-Status "Running TypeScript check..." $Blue
        npx tsc --noEmit
        
        Write-Status "All tests passed" $Green
        return $true
    }
    catch {
        Write-Status "Tests failed: $($_.Exception.Message)" $Red
        return $false
    }
}

function Invoke-Build {
    if ($SkipBuild) {
        Write-Status "Skipping build as requested" $Yellow
        return $true
    }
    
    Write-Status "Building for production..." $Blue
    
    try {
        # Clean previous build
        if (Test-Path ".next") {
            Remove-Item ".next" -Recurse -Force
        }
        
        # Install dependencies
        Write-Status "Installing dependencies..." $Blue
        npm ci --production=false
        
        # Build the project
        Write-Status "Building project..." $Blue
        npm run build
        
        Write-Status "Build completed successfully" $Green
        return $true
    }
    catch {
        Write-Status "Build failed: $($_.Exception.Message)" $Red
        return $false
    }
}

function Invoke-VercelDeploy {
    Write-Status "Deploying to Vercel..." $Blue
    
    try {
        # Check if Vercel CLI is installed
        if (-not (Test-Command "vercel")) {
            Write-Status "Installing Vercel CLI..." $Blue
            npm install -g vercel
        }
        
        # Deploy to production
        Write-Status "Deploying to production environment..." $Blue
        vercel --prod --yes
        
        Write-Status "Deployment completed successfully" $Green
        return $true
    }
    catch {
        Write-Status "Deployment failed: $($_.Exception.Message)" $Red
        return $false
    }
}

function Test-Deployment {
    Write-Status "Testing deployment..." $Blue
    
    try {
        # Wait for deployment to be ready
        Start-Sleep -Seconds 30
        
        # Test the main page
        $response = Invoke-WebRequest -Uri "https://$Domain" -UseBasicParsing -TimeoutSec 30
        
        if ($response.StatusCode -eq 200) {
            Write-Status "Deployment test successful" $Green
            return $true
        }
        else {
            Write-Status "Deployment test failed: Status $($response.StatusCode)" $Red
            return $false
        }
    }
    catch {
        Write-Status "Deployment test failed: $($_.Exception.Message)" $Red
        return $false
    }
}

function Invoke-PostDeployment {
    Write-Status "Running post-deployment tasks..." $Blue
    
    try {
        # Set up domain
        Write-Status "Configuring domain..." $Blue
        vercel domains add $Domain
        
        # Set up SSL
        Write-Status "Configuring SSL..." $Blue
        vercel domains verify $Domain
        
        # Set up environment variables in Vercel
        Write-Status "Configuring environment variables..." $Blue
        vercel env pull .env.production.local
        
        Write-Status "Post-deployment tasks completed" $Green
        return $true
    }
    catch {
        Write-Status "Post-deployment tasks failed: $($_.Exception.Message)" $Red
        return $false
    }
}

function Start-Deployment {
    Write-Status "Starting Alpine Education & Visa Services Production Deployment" $Green
    Write-Status "================================================================" $Green
    
    # Pre-deployment checks
    Write-Status "Phase 1: Pre-deployment Checks" $Blue
    
    if (-not (Test-Dependencies)) {
        Write-Status "Dependency check failed. Aborting deployment." $Red
        exit 1
    }
    
    if (-not (Test-EnvironmentVariables)) {
        Write-Status "Environment variable check failed. Aborting deployment." $Red
        exit 1
    }
    
    # Testing phase
    Write-Status "Phase 2: Testing" $Blue
    
    if (-not (Invoke-Tests)) {
        if (-not $ForceDeploy) {
            Write-Status "Tests failed. Use -ForceDeploy to continue anyway." $Red
            exit 1
        }
        else {
            Write-Status "Tests failed but continuing due to -ForceDeploy flag" $Yellow
        }
    }
    
    # Build phase
    Write-Status "Phase 3: Building" $Blue
    
    if (-not (Invoke-Build)) {
        Write-Status "Build failed. Aborting deployment." $Red
        exit 1
    }
    
    # Deployment phase
    Write-Status "Phase 4: Deployment" $Blue
    
    if (-not (Invoke-VercelDeploy)) {
        Write-Status "Deployment failed. Aborting." $Red
        exit 1
    }
    
    # Post-deployment phase
    Write-Status "Phase 5: Post-deployment" $Blue
    
    if (-not (Invoke-PostDeployment)) {
        Write-Status "Post-deployment tasks failed. Manual intervention may be required." $Yellow
    }
    
    # Verification phase
    Write-Status "Phase 6: Verification" $Blue
    
    if (-not (Test-Deployment)) {
        Write-Status "Deployment verification failed. Manual intervention may be required." $Yellow
    }
    
    # Success message
    Write-Status "================================================================" $Green
    Write-Status "🎉 ALPINE EDUCATION & VISA SERVICES DEPLOYMENT COMPLETED! 🎉" $Green
    Write-Status "================================================================" $Green
    Write-Status "Production URL: https://$Domain" $Green
    Write-Status "Admin Dashboard: https://$Domain/admin" $Green
    Write-Status "Student Portal: https://$Domain/student-portal" $Green
    Write-Status "================================================================" $Green
    Write-Status "Next Steps:" $Blue
    Write-Status "1. Configure Google Analytics" $Blue
    Write-Status "2. Set up email campaigns" $Blue
    Write-Status "3. Test all payment integrations" $Blue
    Write-Status "4. Launch marketing campaigns" $Blue
    Write-Status "5. Monitor system performance" $Blue
    Write-Status "================================================================" $Green
}

# Main execution
try {
    Start-Deployment
}
catch {
    Write-Status "Deployment script failed: $($_.Exception.Message)" $Red
    Write-Status "Stack trace: $($_.ScriptStackTrace)" $Red
    exit 1
} 