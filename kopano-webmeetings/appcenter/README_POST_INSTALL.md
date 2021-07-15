Kopano Web Meetings is now installed and ready for use.

By default the Web Meetings WebApp plugin is not activated for all users. Every user can configure it by himself in the WebApp settings. However you can change this by setting:

*   `kopano-meetings/plugin/enable='True'`

In the current configuration there is no turnserver configured, so Web Meetings will only work between users within networks, where direct connections are allowed.

Kopano can provide a turnserver. To configure it set the following ucr variables:

*   `kopano-meetings/plugin/turn_use_kopano_service='True'`
*   `kopano-meetings/plugin/turn_auth_user='[user provided by Kopano]'`
*   `kopano-meetings/plugin/turn_auth_password='[password provided by Kopano]'`

Access to Kopanos Turn service can be requested at: [https://portal.kopano.com/content/turn-server-access-request](https://portal.kopano.com/content/turn-server-access-request)

Another possibility is to setup your own turnserver. In such a case we recommend to user the [coturn TURN Servers](https://github.com/coturn/coturn/wiki/Downloads).

To configure Kopano Web Meetings using your own turnserver please set the following ucr variables:

*   `kopano-meetings/spreed/configSpreedTurn=True`
*   `kopano-meetings/spreed/stunURIs`
*   `kopano-meetings/spreed/turnURIs`
*   `kopano-meetings/spreed/turnSecret`

Further information can be found here [wiki.z-hub.io](https://kb.kopano.io/display/K4U/Setting+up+Kopano+Web+Meetings).
