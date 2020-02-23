#!/bin/bash

PST=$(ps -ef | grep PM2 | grep -v grep | awk '{print $2}') && kill -9 $PST
/usr/bin/pm2 start /usr/bin/npm --name "ea-edu-nuxt" -- run-script start