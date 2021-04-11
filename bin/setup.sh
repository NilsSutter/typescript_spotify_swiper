#!/bin/bash

if [ -f .env ]; then
    docker-compose build
else 
    echo "IMPORTANT NOTE"
    echo ".env file does not exist."
    echo "fill out the .env file before proceeding with the project setup."
fi