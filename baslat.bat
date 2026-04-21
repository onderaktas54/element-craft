@echo off
title Element Craft - Oyun Sunucusu
echo.
echo  =============================================
echo    ⚗️  Element Craft - Baslatiliyor...
echo  =============================================
echo.
echo  Tarayicida otomatik acilacak: http://localhost:3000
echo  Kapatmak icin bu pencereyi kapatin.
echo.
start http://localhost:3000
npx -y serve . -l 3000
pause
