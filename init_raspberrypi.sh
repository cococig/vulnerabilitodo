#!/usr/bin/env bash

printf "password:"
read -s password

BASEDIR=`dirname $0`

# ignore github fingerprint check
echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

# install nodejs
echo "$password" | sudo -S bash -c "$(curl -fsSL https://deb.nodesource.com/setup_20.x)" 
source ~/.bashrc
echo "$password" | sudo -S apt install -y nodejs

# create .env
cd $BASEDIR
echo 'DATABASE_URL="file:./dev.db"' >> backend/.env

# initialization
npm ci
npm run init