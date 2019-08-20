#!/bin/sh

# TODO is better way to get the latest ini from the appcenter?
curl -s https://appcenter-test.software-univention.de/meta-inf/4.3/kopano-meet/kopano-meet_20190813151541.ini > kopano-meet.ini

univention-app dev-setup-local-appcenter
univention-app dev-populate-appcenter --new \
	--ini kopano-meet.ini
