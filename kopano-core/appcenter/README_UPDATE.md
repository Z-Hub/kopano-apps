Please see [Kopano Changelog](https://documentation.kopano.io/kopano_changelog/) for a general overview of all updates.

### Changes in Kopano4UCS 1.8.4 and Kopano Groupware Core 8.7.25

* Update integration for UCS 5.0
* Improve logic of repository configuration to work with new style license keys and disable automatically of login at repository fails
* Check [Kopano changelog](https://documentation.kopano.io/kopano_changelog/kc.html#kopano-core-8-7-25-8-7-25
-0) for changes relating to Kopano Groupware Core 8.7.25

### Changes in Kopano4UCS 1.6.2

* Remove explicit dependency of kopano-contacts, as its now obsolete in Kopano Groupware Core 8.7.7
* Remove explicit generation of locales as setting the ucr already takes care of it

### Changes in Kopano4UCS 1.6.0

* Thanks to the contributions of [linudata GmbH](https://www.linudata.de/) it is now possible separately install Kopano4UCS and Kopano.
  * this functionality has no direct impact on the Kopano4UCS app itself, but can be used when managing a non-App Center installation.
  * check the [Kopano4UCS repository](https://stash.z-hub.io/projects/K4U/repos/kopano4ucs/browse/docs/just-integration.md) for further information. 

### Changes in Kopano Core 8.7.1 and Kopano4UCS 1.5.33

* Updates Kopano to [8.7.1](https://forum.kopano.io/topic/2110/kopano-groupware-core-8-7-final-available).
* Updates integration package for 8.7.x

### Changes in Kopano Core 8.6.8 and Kopano4UCS 1.5.13

* Updates Kopano to a special 8.6.8.10 build to solve the issue with the previous 8.6.8.2 packages.
* Update integration to use `kopano-cli` instead of `kopano-admin` in the background. This comes with a small UX change for setting the handling of conflicting or recurring meeting requests. Settings will be migrated.

### Changes in Kopano Core 8.6.2 and Kopano4UCS 1.5.5

* the integration has been updated to support the upcoming Kopano Groupware Core 8.7 release
  * **IMPORTANT:** After updating to 8.7.x through [the Kopano apt repository](https://kb.kopano.io/display/K4U/Updating+Kopano+packages+directly+from+the+Kopano+download+server) you will find that ´kopano-gateway´ and ´kopano-ical´ will refuse to start because of an incompatible configuration. Please execute the script `/usr/share/kopano4ucs/kopano4ucs-update-settings870.sh´ to update your configuration files. This will be done later on automatically when the Kopano Core app natively provides this release.
* fix language selection for store creation
* fix kopano-server not listening on port 236

### Changes in Kopano Core 8.6.2 and Kopano4UCS 1.4.18

* it is now possible to manage the Kopano apt repository through the `App Settings` option in the App Center.

### Changes in Kopano Core 8.6.2 and Kopano4UCS 1.4.5

**Important:** This App update contains a security fix for kopano-server. After the update is installed, **manual user interaction may be required** if the kopano-server service is not running and users cannot connect. For more information on how to fix this issue, please read and follow the [Kopano upgrade documentation](https://kopano.com/releases/kopanocore-8-5-7/)

* Replace Debian 9 packages with packages specifically built for Univention 4.3
* add IMAP service to host to route network internal smtp traffic
* update repo definitions for Univention 4.3 repository
* fixes multiserver setup for archiver configuration

### Changes in Kopano Core 8.4.5 and Kopano4UCS 1.3.9

* to ease the upgrade from UCS 4.1 to 4.2 Kopano Core has been updated to 8.4.5. Please have a look at the [changelog](https://documentation.kopano.io/kopano_changelog/kc.html#kopano-core-8-4) for all changes since 8.3.1.
* Kopano4UCS now support for nested groups and disabled the possibility to upgrade Kopano Core from the Kopano packages repository (see https://wiki.z-hub.io/x/poBX for more information).

### Changes in Kopano Core 8.3.1 Pre-Final (8.3.1.32) and Kopano4UCS 1.3.1

*   Kopano Core has been updated to 8.3.1. The 8.3.x release includes the following key changes:
*   improved memory management
*   improved performance for IMAP
*   reduced dependencies
*   seveeral improvements to kopano-migration-pst
*   Updates Kopano4UCS to 1.3.1
*   update repository information to use Univention 4.2 repository instead of Debian 8
