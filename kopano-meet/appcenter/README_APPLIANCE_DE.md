# Willkommen auf Ihrer neuen Kopano Meet Appliance!

Meet ist das Videomeeting-System von Kopano. Verglichen mit anderen bekannten Plattformen für Videokonferenzen betreiben Sie Ihr neues System selbst. Dies erlaubt Ihnen, in höchstem Grade digital souverän zu sein. Gleichzeitig müssen Sie sich aber auch selbst um die Infrastruktur darum herum kümmern.

### Bitte lesen Sie diesen Text sorgfältig durch. Ihre Meet-App läuft nicht in jeder Umgebung sofort und automatisch!

## 1. DNS-Auflösung, Fully Qualified Domain Name (FQDN)

Kopano Meet muss über den in UCS eingestellten Rechnernamen (FQDN) für jeden Benutzer, der an Videomeetings teilnehmen möchte, erreichbar sein. Außerdem müssen die Benutzer auch die Subdomain ucs-sso erreichen können (für Gäste nicht erforderlich). Wenn Sie Ihr UCS-Systems als DNS-Server benutzen, ist dies so. In jedem anderen Fall müssen Sie dafür Sorge tragen, dass ein ping aufden Namen des UCS-Systems auf allen Clients funktioniert.

## 2. Anrufe außerhalb des eigenen Subnetzes erfordern einen TURN-Dienst

Die Webmeeting-Verbindungen werden direkt zwischen den Geräten hergestellt. Um Verbindungen zwischen Clients in verschiedenen Subnetzen (z.B. Smartphone über LTE und PC über WLAN) zu ermöglichen, wird ein Dienst benötigt, der weiß, wie ein Gerät erreicht werden kann. Dies ist ein sogenannter TURN-Dienst. Ihre Kopano Meet Appliance ist so vorkonfiguriert, dass sie einen von Kopano kostenlos angebotenen TURN-Server verwendet. Dieser kostenlose Dienst wird von allen Meet-Instanzen gemeinsam genutzt. Es gibt keine Garantie für die Verfügbarkeit. Für Ihre Produktionseinrichtung wird ein eigener TURN-Dienst oder zumindest ein kostenpflichtiger Dienst mit garantierter Verfügbarkeit dringend empfohlen. [Beim Kauf von Kopano Meet](https://meet-app.io/trial-starter-package) bieten wir Ihnen einen solchen Dienst an. Um Ihren eigenen TURN-Server einzurichten, lesen Sie bitte die Hinweise in [der Meet-Dokumentation](https://documentation.kopano.io/kopano_meet_manual/) oder wenden Sie sich an den [Kopano Professional Service](https://kopano.com/support-info/).

## 3. Weiterführende Hinweise

Um einen anderen FQDN als den Standard-FQDN dieser UCS-Installation zu verwenden, ändern Sie bitte diesen Wert in den `APP SETTINGS` im UCS App Center. Auf anderen Systemen als einem Master- oder Backup-Domänencontroller muss das Join-Skript anschließend manuell erneut ausgeführt werden (es wird eine Erinnerung dafür in der UCS-Benutzeroberfläche angezeigt). Wenn die Anmeldung auf einer anderen Domäne als dem ucs-sso erfolgen soll, muss dies ebenfalls in den App-Einstellungen der OpenID-Provider-App konfiguriert werden. Für diese Appliance wurde der OpenID-Provider so konfiguriert, dass er denselben FQDN wie Meet selbst verwendet.

*Und jetzt viel Spaß beim Videomeeten!*

PS: Wenn Sie weitere Fragen haben, schauen Sie sich das [Kopano4UCS Wiki](https://kb.kopano.io/display/K4U/Documentation+-+Getting+Started) oder das [Kopano Forum](https://forum.kopano.io/) an.
