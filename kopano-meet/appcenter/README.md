# Welcome to the Kopano Meet app for UCS!

Kopano Meet makes use of the [OpenID Connect Provider app](#module=appcenter:appcenter:0:id:openid-connect-provider) to allow UCS users to login to Meet.

**Important:** Meet is by default configured to use the FQDN of the UCS system it was installed. If this name cannot be resolved for everyone that should use Meet (either as a logged in user or a guest) this can be configured in the app settings below. On systems other than the Master or Backup Domaincontroller the Join script needs to be rerun manually afterwards (there will be a reminder for this in the UCS UI).

The same accounts for the login page of the OpenID Provider, which usually uses the ucs-sso subdomain. In case your ucs-sso subdomain is not globally reachable you can set a different FQDN for it in the app settings as well. The page only needs to be resolvable for users that should login with a username, if you only expect guest access from the internet you don't need to expose it globally.

In the default configuration there is no TURN server configured, so Kopano Meet will only work between users within networks where direct connections are allowed. If you're interested in using the Kopano TURN services (recommended), please [request access here](https://meet-app.io/free-unsupported-community-package).

Alternatively you can use your own TURN service. Please check the [Meet documentation](https://documentation.kopano.io/kopano_meet_manual/) for instructions for configuring Meet for your own TURN service.

**Please note:** Clicking on "Sign out" in Meet will currently sign users directly back in. This is due to the fact that Meet currently does not sign out users at the Univention OpenID provider app. This will be added in a future version.
