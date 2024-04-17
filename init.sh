#!/usr/bin/env bash

npm ci
echo 'DATABASE_URL="file:./dev.db"' >> backend/.env
npm run init