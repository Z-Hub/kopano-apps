# Willkommen zur Kopano Meet App für UCS!

Kopano Meet verwendet die [OpenID Connect Provider App](#module=appcenter:appcenter:appcenter:0:id:openid-connect-provider), damit sich UCS-Benutzer bei Meet anmelden können.

In der Standardkonfiguration ist kein TURN-Server konfiguriert, so dass Kopano Meet nur zwischen Benutzern in Netzwerken funktioniert, in denen direkte Verbindungen erlaubt sind. Wenn Sie an der Nutzung des Kopano TURN-Dienstes (empfohlen) interessiert sind, fordern Sie bitte [hier Ihren Zugang an](https://meet-app.io/free-unsupported-community-package).

Alternativ können Sie auch Ihren eigenen TURN-Service nutzen. Bitte lesen Sie die [Meet-Dokumentation](https://documentation.kopano.io/kopano_meet_manual/) für Anweisungen zur Konfiguration von Meet für Ihren eigenen TURN-Dienst.

**Bitte beachten Sie:** Wenn Sie in Meet auf "Abmelden" klicken, werden die Benutzer derzeit direkt wieder angemeldet. Dies liegt daran, dass Meet derzeit keine Benutzer bei der Univention OpenID Provider-App abmelden kann. Dies wird in einer zukünftigen Version hinzugefügt.

