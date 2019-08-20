# Kopano Meet for Univention

App is still a work in progress

## Current state:
- app uses code from https://stash.z-hub.io/projects/K4U/repos/kopano-apps/pull-requests/2/overview and https://github.com/zokradonh/kopano-docker/pull/217
- values for hostnames are currently hardcoded
- app uses the "OpenID Connect Provider" app from the Univention Appcenter (its not desired to have multiple OpenID providers in the Appcenter)
- Meet is available on the UCS system on /meet
- Meet will redirect to the login on the ucs-sso subdomain
- Login in Meet will fail because of missing scope in the openid token
  - Solution: use identifier_scopes_conf = /etc/kopano/konnectd-identifier-scopes.yaml to define required scopes (example https://github.com/zokradonh/kopano-docker/blob/b52db5505761d097c09795a79444e011120a6f2a/konnect/konnectd-identifier-scopes.yaml

```
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
```
- Once login is resolved, Grapi needs to be configured for the LDAP backend
```
#!/bin/sh

set -ex

KC_BASE=/home/ubuntu/kc-dev/kopanocore

export prometheus_multiproc_dir=/tmp/mfr-prometheus-ldap
mkdir -p $prometheus_multiproc_dir

export LDAP_URI="ldap://10.98.91.1:8389"
export LDAP_BINDDN="cn=admin,dc=kopano-dev,dc=local"
export LDAP_BINDPW="kopano-dev"
export LDAP_BASEDN="dc=kopano-dev,dc=local"
#export LDAP_LOGIN_ATTRIBUTE="uid"
#export LDAP_UUID_ATTRIBUTE="uidNumber"
#export LDAP_FILTER="(objectClass=inetOrgPerson)"


mkdir -p /tmp/kopano-rest
make ARGS="\
        --socket-path=/srv/shared/kc-dev-1/kopano-rest-mfr-ldap \
        --pid-file=/tmp/kopano-rest/kopano-rest-mfr-ldap.pid \
        --insecure \
        --backends=ldap \
        -w 4 $@" start-mfr
```


## Open, but not immediate problems:

- Konnect app needs additional fields
```
- id: kpop-https://kopano.demo:2015/meet/
  name: Kopano Meet
  application_type: web
  trusted: true
  redirect_uris:
  - https://kopano.demo:2015/meet/
  trusted_scopes:
  - konnect/guestok
  - kopano/kwm
  jwks:
    keys:
    - kty: EC
      use: sig
      crv: P-256
      d: zWnC2bQZj9M4css6WaRMJo7hoW2YD_EOL2AMXP_tGtY
      kid: meet-kwmserver
      x: dtL-FsbVY2n9MjjuyUIjhtZ5RsKawBfn3zNioC3YKMk
      y: IdNl3nU3q1H857pbEO99MOBAbeEEucT2muwS9KpJPTY
  request_object_signing_alg: ES256
```
- Konnect needs to enable the guest mode
- Should we use an own Konnect instance that uses the Univention one as its upstream id provider?

## Planning

Milestone 1:
- app should use the docker containers from https://github.com/zokradonh/kopano-docker/ (may need modifications there)
- get app running with Kopano
- settings dialogue for turn server stuff

Milestone 2:
- figure out where to upload release containers (for the moment this is using nightly builds

Milestone 3:
- get app description ready and add some pictures


Reading material:
- https://www.univention.com/blog-en/2018/12/multi-container-support-for-docker-apps-for-univention-app-center/
- https://docs.software-univention.de/app-provider.html#create-app-with-docker:compose-postprocessing
