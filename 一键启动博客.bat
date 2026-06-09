@echo off
title Blog Startup
echo Starting your blog server...

cd /d "d:\ai\MyBlog"

start http://localhost:3000

echo Server is running... Keep this window open.
cmd /k "pnpm run dev"
