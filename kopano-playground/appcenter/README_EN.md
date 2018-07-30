## Kopano Playground

**This app does not have any practical use outside of development environments**

It is recommended to install the [Univention Demo Data](#module=appcenter:appcenter:0:id:univention-demo-data) app to have users for the actual test. All users created through the app have the password `univention`.

You can use the following script to convert the users from the Demo Data app to Kopano users:

```
#!/bin/sh

eval "$(ucr shell)"

for u in $(udm users/user list | grep "DN:" | awk '{ print $2 }'); do
        uid=$(echo "$u" | cut '-d,' -f1 | cut -b5-)
        case $uid in
        join-backup|join-slave|ucs-sso)
                continue
                ;;
        *)
                udm users/user modify --dn "$u" \
                --set mailPrimaryAddress="$uid@$(ucr get domainname)" \
                --set kopano-role=user
                ;;
        esac
done
```

### Calling the oidc playground:

`https://@%@hostname@%@.@%@domainname@%@/oidc-playground/?discovery_uri=https://@%@hostname@%@.@%@domainname@%@/.well-known/openid-configuration&discovery=auto`

### Calling the kapi playground:

`https://@%@hostname@%@.@%@domainname@%@/kapi-playground/?iss=@%@hostname@%@.@%@domainname@%@`
