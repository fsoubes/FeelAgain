#!/bin/bash

echo What is the commit?
read COMMIT

git add .
git commit -m "${COMMIT}"
git push origin main