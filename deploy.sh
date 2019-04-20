#!/bin/bash
echo "Start Deployment-------->"
cd ~/fansights-app

echo "Pulling from github....."
git stash
git pull origin master

echo "Installing packages...."
npm install

echo "Starting the server....."
npm run prod
echo "End Deployment-------->"
