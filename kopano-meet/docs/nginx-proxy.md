# Nginx reverse proxy in front of Meet

The below code makes the following assumptions:

- Meet should be accessible on its own subdomain
- Meet and the OpenID Provider app are installed on the same host
- Meet and the OpenID Provider app have been configured to use the external domain

Relevant UCR variables:

```bash
$ ucr search --brief oidc/konnectd/issuer_identifier
oidc/konnectd/issuer_identifier: https://meet.kopano.intranet
$ ucr search --brief kopano/docker/FQDN_MEET
kopano/docker/FQDN_MEET: meet.kopano.intranet
$ ucr search --brief kopano/docker/FQDN_SSO
kopano/docker/FQDN_SSO: meet.kopano.intranet
```

Please make sure that the Join scripts have finished running so that the domain is also properly reflected in the identifier registration of the OpenID Provider app.

Nginx configuration for the front facing system:

```cfg
upstream univention-meet {
    server ucs-5237.kopano.intranet:2015;
}

upstream univention-sso {
    server ucs-5237.kopano.intranet:8777;
}

server {
    listen 80;
    server_name _;
    return 301 https://$host$request_uri;
}


server {
    listen 443 ssl;
    server_name meet.kopano.intranet;
    ssl_certificate      /path/to/kopano.intranet+1.pem;
    ssl_certificate_key  /path/to/kopano.intranet+1-key.pem;

    location = / {
        return 301 https://meet.kopano.intranet/meet/;
    }

    location / {
        proxy_pass         http://univention-meet;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;

        proxy_buffer_size           128k;
        proxy_buffers               4 256k;
        proxy_busy_buffers_size     256k;
    }

    location /.well-known/openid-configuration {
        proxy_pass http://univention-sso/.well-known/openid-configuration;
    }

    location /konnect/v1/jwks.json {
        proxy_pass http://univention-sso/konnect/v1/jwks.json;
    }

    location /konnect/v1/token {
        proxy_pass http://univention-sso/konnect/v1/token;
    }

    location /konnect/v1/userinfo {
        proxy_pass http://univention-sso/konnect/v1/userinfo;
    }

    location /konnect/v1/static {
        proxy_pass http://univention-sso/konnect/v1/static;
    }

    location /konnect/v1/session {
        proxy_pass http://univention-sso/konnect/v1/session;
    }

    location /signin/ {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://univention-sso/signin/;
    }

    location /meetid/.well-known/openid-configuration {
        proxy_pass http://univention-meet/.well-known/openid-configuration;
    }

    location /api/kwm/v2/ {
        proxy_pass http://univention-meet/api/kwm/v2/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_buffering off;
    }
}
```
