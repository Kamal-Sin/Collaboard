#!/bin/bash

# Production startup script for Collaboard server
echo "Starting Collaboard server in production mode..."

# Create logs directory if it doesn't exist
mkdir -p logs

# Check if required environment variables are set
if [ -z "$MONGODB_URI" ]; then
    echo "Error: MONGODB_URI environment variable is not set"
    exit 1
fi

if [ -z "$JWT_SECRET_KEY" ]; then
    echo "Error: JWT_SECRET_KEY environment variable is not set"
    exit 1
fi

# Set default port if not provided
if [ -z "$PORT" ]; then
    export PORT=10000
fi

echo "Environment configured:"
echo "- NODE_ENV: ${NODE_ENV:-production}"
echo "- PORT: $PORT"
echo "- CORS_ORIGIN: ${CORS_ORIGIN:-not set}"

# Start the server
echo "Starting server..."
node server.js
