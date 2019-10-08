#!/bin/sh
set -x

patch $(docker inspect --format='{{.GraphDriver.Data.LowerDir}}' 915444a0a380a22962e877270ddf3e0d94504e3cc5de773d0857926a6a28cf2d)//usr/local/bin/docker-entrypoint-univention.sh < openid.patch

