#!/bin/bash

# Set higher file descriptor limit for this session
ulimit -n 4096

# Start the app with reduced resource usage and minimum files to watch
npx expo start --max-workers=2 --no-dev 