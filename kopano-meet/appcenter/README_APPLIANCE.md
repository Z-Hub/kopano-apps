# Welcome to your new Kopano Meet Appliance!

Meet is the videomeeting system by Kopano. Compared to other known platforms for videomeetings you are running you new system on premise. This allows you to be digital sovereign at the highest degree. But at the same time it requires you to take care on infrastructure requirements.

### Please carefully read this text. Your Meet-appliance will not run out of the box in every environment!

## 1. DNS resolution, Fully qualified domain name (FQDN)

Kopano Meet needs to be reachable through the configured fully qualified domain name (FQDN) by every user needing to participate in calls. In addition to this users also need to be able to reach the "ucs-sso subdomain" (not required for guests). This is already the case when using the UCS system as your DNS server.

## 2. Calling outside the own subnet requires a TURN-service

Connections are established between devices directly. To allow connections between clients on different subnets (e.g. Smartphone via LTE and PC via WLAN) a services knowing about the way to reach a device is needed. This is a so called TURN-service. Your Kopano Meet Appliance is pre-configured to use a free TURN server offered by Kopano. This free service is shared between all Meet-instances and there is no guarantee on availability. For your production setup an own TURN service or at least a paid service with guaranteed availability is highly recommended. When [purchasing Meet from Kopano](https://meet-app.io/trial-starter-package) we will offer such a service to you. To setup your own TURN server please check the [Meet documentation](https://documentation.kopano.io/kopano_meet_manual/) for instructions or [contact the Kopano Professional Services](https://kopano.com/support-info/) for help.

## 3. Advanced notes

To use a different FQDN than the default one of this UCS installation please change this value in the `APP SETTINGS` in the UCS App Center. On systems *other than a Master or Backup Domaincontroller the Join script needs to be rerun manually afterwards* (there will be a reminder for this in the UCS UI). If logging in should be done on a domain other than the "ucs-sso" this needs to be configured in the app settings of the OpenID Provider app as well. For this app appliance the OpenID Provider has been configured to use the same FQDN as Meet itself.

**Please note:** Clicking on "Sign out" in Meet will currently sign users directly back in. This is due to the fact that Meet currently does not sign out users at the Univention OpenID provider app. This will be added in a future version.

*Have fun!*

PS: If you have further questions, have a look at the [Kopano4UCS Wiki](https://wiki.z-hub.io/display/K4U/Documentation+-+Getting+Started) or [Kopano Forum](https://forum.kopano.io/). For usage question please refer to the Kopano Meet [user manual](https://documentation.kopano.io/kopano_meet_manual/user.html).
