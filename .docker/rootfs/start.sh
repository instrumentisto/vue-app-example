#!/bin/sh


logMsg() {
  echo "["`date +%d'-'%b'-'%Y' '%H':'%M':'%S`"] $1" >> /proc/self/fd/2
}


#cd /app && npm start
