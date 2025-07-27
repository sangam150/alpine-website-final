# Alpine Education Test Runner Script
# This script runs all tests and generates comprehensive reports

Write-Host "🧪 Alpine Education Test Suite" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check if Node.js is installed
if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (-not (Test-Command "npm")) {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies if needed
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Run TypeScript type checking
Write-Host "🔍 Running TypeScript type check..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript type check failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ TypeScript type check passed!" -ForegroundColor Green

# Run ESLint
Write-Host "🔍 Running ESLint..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ESLint check failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ ESLint check passed!" -ForegroundColor Green

# Run Prettier format check
Write-Host "🎨 Running Prettier format check..." -ForegroundColor Yellow
npm run format:check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prettier format check failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prettier format check passed!" -ForegroundColor Green

# Run security audit
Write-Host "🔒 Running security audit..." -ForegroundColor Yellow
npm run security:audit
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Security vulnerabilities found. Consider running 'npm run security:fix'" -ForegroundColor Yellow
} else {
    Write-Host "✅ Security audit passed!" -ForegroundColor Green
}

# Run unit tests
Write-Host "🧪 Running unit tests..." -ForegroundColor Yellow
npm run test:coverage
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Unit tests failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Unit tests passed!" -ForegroundColor Green

# Run build test
Write-Host "🏗️  Running build test..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build test passed!" -ForegroundColor Green

# Check if Playwright is installed
if (Test-Command "npx playwright") {
    Write-Host "🎭 Running end-to-end tests..." -ForegroundColor Yellow
    npx playwright install
    npm run test:e2e
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ End-to-end tests failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ End-to-end tests passed!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Playwright not installed. Skipping end-to-end tests." -ForegroundColor Yellow
}

# Generate test summary
Write-Host "📊 Test Summary" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host "✅ TypeScript: Passed" -ForegroundColor Green
Write-Host "✅ ESLint: Passed" -ForegroundColor Green
Write-Host "✅ Prettier: Passed" -ForegroundColor Green
Write-Host "✅ Unit Tests: Passed" -ForegroundColor Green
Write-Host "✅ Build: Passed" -ForegroundColor Green

if (Test-Command "npx playwright") {
    Write-Host "✅ E2E Tests: Passed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 All tests completed successfully!" -ForegroundColor Green
Write-Host "🚀 Ready for deployment!" -ForegroundColor Green 