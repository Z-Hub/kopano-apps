Kopano Web Meetings ist nun installiert und bereit zur Verwendung.

Standardmäßig ist das Web Meetings WebApp Plugin nicht für alle Benutzer aktiviert. Jeder Benutzer kann das Plugin in den WebApp Einstellungen selbst aktivieren. Natürlich kann das Web Meetings Plugin auch für alle Benutzer aktiviert werden indem die folgende ucr variable gesetzt wird:

*   kopano-meetings/plugin/enable='True'

In der momentanen Konfiguration ist kein Turnserver konfiguriert. Das bedeuetet, dass Web Meetings nur zwischen Benutzern funktioniert die sich innerhalb eines Netzwerkes befinden, indem Sie direkt eine Verbindung aufbauen können.

Kopano kann einen Turnserver zur Verfügung stellen der mit den folgenden ucr Variablen konfiguriert werden kann:

*   kopano-meetings/plugin/turn\_use\_kopano_service='True'
*   kopano-meetings/plugin/turn\_auth\_user='\[Benutzer von Kopano\]'
*   kopano-meetings/plugin/turn\_auth\_password='\[Passwort von Kopano\]'

Diese Zugangsdaten können Sie über das folgende Formular anfordern: [https://portal.kopano.com/content/turn-server-access-request](https://portal.kopano.com/content/turn-server-access-request)

Eine weitere Möglichkeit besteht darin einene eigenen Turnserver aufzusetzen. Hierfür empfehlen wir die Nutzung des [coturn TURN Servers](https://github.com/coturn/coturn/wiki/Downloads).

Für die Konfiguration von Web Meetings an einem eigenen Turnserver stehen folgende ucr Variablen zur Verfügung:

*   kopano-meetings/spreed/configSpreedTurn=True
*   kopano-meetings/spreed/stunURIs
*   kopano-meetings/spreed/turnURIs
*   kopano-meetings/spreed/turnSecret

Weiterführende Informationen finden sich unter [wiki.z-hub.io](https://wiki.z-hub.io/display/K4U/Setting+up+Kopano+Web+Meetings).
