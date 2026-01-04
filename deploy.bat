@echo off
echo ========================================
echo Deploying to Railway...
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Adding changes...
git add .

echo Step 2: Committing...
set /p message="Enter commit message: "
git commit -m "%message%"

echo Step 3: Pushing to GitHub...
git push

echo.
echo ========================================
echo Deploying to Railway!
echo Check: https://railway.app
echo ========================================
pause
