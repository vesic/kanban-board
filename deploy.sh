#!/usr/bin/env bash

rm -rf deploy

mkdir deploy

cd client

npm run build

cd build

mv * ../../deploy/

cd ..

rm -rf build

cd ..

cp -R api/* ./deploy

# php -S localhost:8080

# open localhost:8080 # mac only
