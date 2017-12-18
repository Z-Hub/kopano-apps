Kopano Web Meetings provides an easy intuitive use of the WebRTC technology in creating online meetings just with the use of a browser. It does not require any plugins or extra software to run. The basic requirement is a browser with WebRTC support, which for example is provided by Chrome or Firefox. This plugin integrates Kopano Web Meetings with WebApp allowing direct interaction in your daily work.

Please take care of the following advices after the installation of Kopano Web Meetings.

By default the Web Meetings WebApp plugin is not activated for all users. Every user can configure it by himself in the WebApp settings. However you can change this by setting:

*   Kopano-meetings/plugin/enable='True'

In the current configuration there is no turnserver configured, so Web Meetings will only work between users within networks, where direct connections are allowed.

Kopano can provide a turnserver. To configure it set the following ucr variables:

*   kopano-meetings/plugin/turn\_use\_kopano_service='True'
*   kopano-meetings/plugin/turn\_auth\_user='\[user provided by kopano\]'
*   kopano-meetings/plugin/turn\_auth\_password='\[password provided by kopano\]'

Access to Kopanos Turn service can be requested at: [https://portal.kopano.com/content/turn-server-access-request](https://portal.kopao.com/content/turn-server-access-request)

Another possibility is to setup your own turnserver. In such a case we recommend to user the [coturn TURN Servers](https://github.com/coturn/coturn/wiki/Downloads).

To configure Kopano Web Meetings using your own turnserver please set the following ucr variables:

*   kopano-meetings/spreed/configSpreedTurn=True
*   kopano-meetings/spreed/stunURIs
*   kopano-meetings/spreed/turnURIs
*   kopano-meetings/spreed/turnSecret

Further information can be found here [wiki.z-hub.io](https://wiki.z-hub.io/display/K4U/Setting+up+Kopano+Web+Meetings).
