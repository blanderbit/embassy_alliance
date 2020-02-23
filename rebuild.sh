#!/bin/bash

MYPORT=3000

/usr/bin/git pull
/usr/bin/npm run build
/usr/bin/npm run generate

PST=$(ps -ef | grep PM2 | grep -v grep | awk '{print $2}') && kill -9 $PST
NUM=$(/usr/sbin/lsof -P -n -i | grep $MYPORT | grep -v grep | wc -l)
for (( c=0; c<${NUM}; c++ ))
do  
   PROCE=$(/usr/sbin/lsof  -P -n -i | grep $MYPORT | grep -v grep | head -n 1 | awk  '{print $2}')
   kill -9 $PROCE
done

/usr/bin/pm2 start /usr/bin/npm --name "ea-edu-nuxt" -- run-script start
