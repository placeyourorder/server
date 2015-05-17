@echo off
echo.

set NODE_ENV=development
node-dev app.js --debug | bunyan -o short