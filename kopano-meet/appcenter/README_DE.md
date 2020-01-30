# Willkommen zur Kopano Meet App für UCS!

Kopano Meet verwendet die [OpenID Connect Provider App](#module=appcenter:appcenter:appcenter:0:id:openid-connect-provider), damit sich UCS-Benutzer bei Meet anmelden können.

**Wichtig:** Meet ist so konfiguriert, dass standardmäßig der FQDN des UCS-Systems verwendet wird, auf dem die App installiert wurde. Wenn diese Adresse nicht für alle Personen erreichbar ist, die Meet verwenden sollen (entweder als angemeldeter Benutzer oder als Gast), kann diese in den untenstehenden App-Einstellungen konfiguriert werden. Sofern Meet nicht auf einem UCS Domaänenmaster or Domänenbackup installiert ist muss das Join Skript anschliessend manuell ausgeführt werden (es gibt hierfür auch einer Erinnerung in der UCS UI).

Das gleiche gilt für die Login-Seite des OpenID-Providers, die normalerweise die Subdomain ucs-sso verwendet. Falls Ihre ucs-sso Subdomain nicht global erreichbar ist, können Sie in den Einstellungen der App auch einen anderen FQDN dafür festlegen. Die Seite muss nur für Benutzer auflösbar sein, die sich mit einem Benutzernamen einloggen sollen, wenn Sie nur Gastzugriffe aus dem Internet erwarten, müssen Sie diese nicht extern verfügbar machen.

In der Standardkonfiguration ist kein TURN-Server konfiguriert, so dass Kopano Meet nur zwischen Benutzern in Netzwerken funktioniert, in denen direkte Verbindungen erlaubt sind. Wenn Sie an der Nutzung des Kopano TURN-Dienstes (empfohlen) interessiert sind, fordern Sie bitte [hier Ihren Zugang an](https://meet-app.io/free-unsupported-community-package).

Alternativ können Sie auch Ihren eigenen TURN-Service nutzen. Bitte lesen Sie die [Meet-Dokumentation](https://documentation.kopano.io/kopano_meet_manual/) für Anweisungen zur Konfiguration von Meet für Ihren eigenen TURN-Dienst.

**Bitte beachten Sie:** Wenn Sie in Meet auf "Abmelden" klicken, werden die Benutzer derzeit direkt wieder angemeldet. Dies liegt daran, dass Meet derzeit keine Benutzer bei der Univention OpenID Provider-App abmelden kann. Dies wird in einer zukünftigen Version hinzugefügt.
