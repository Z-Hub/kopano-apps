openidprovider scopes:
all on host machine:
vi /var/lib/docker/overlay/8343ff3e068f75832cfe72d7fd72b6c4c5277def5a4f65dff461787312cdfef2/root/usr/local/bin/docker-entrypoint-univention.sh
+ set -- "$@" --identifier-scopes-conf="$identifier_scopes_conf"

vi /etc/kopano/konnectd.cfg
+ identifier_scopes_conf=/etc/kopano/konnectd-identifier-scopes.yaml

/etc/kopano/konnectd-identifier-scopes.yaml
# This file contains additional scopes for Konnect. All of the scopes listed
# here are made available to clients upon request if not limited by other means.

---
scopes:
  kopano/gc:
    description: "Kopano"

  kopano/kwm:
    description: "Access Kopano Meet"

  kopano/kvs:
    description: "Access Kopano Key Value Store"

  kopano/pubs:
    description: "Access Kopano Pub/Sub"

stop and start container.
