@echo off
cd /d "%~dp0"
node server/start.mjs
if errorlevel 1 pause
