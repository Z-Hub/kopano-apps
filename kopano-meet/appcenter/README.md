# Kopano Meet for Univention

App is still a work in progress

## Current state:
- app uses the "OpenID Connect Provider" app from the Univention Appcenter (its not desired to have multiple OpenID providers in the Appcenter)
  - for functionality we require https://github.com/univention/openid-connect-provider/pull/1 to be merged
- Meet is available on the UCS system on /meet
- Meet will redirect to the login on the ucs-sso subdomain


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
