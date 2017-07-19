#!/bin/sh


# Share application files if required.
appDir=/app
if [ "$SHARE_APP" == "1" ]; then
  mkdir -p /shared
  cp -rf /app/* /shared/
  chown -R node:node /shared/*
  appDir=/shared
fi


# Run CMD as PID 1 under 'node' user.
cmd="cd $appDir && exec $@"
exec su -c "$cmd" node
