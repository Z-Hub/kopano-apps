Please see [Kopano Changelog](https://documentation.kopano.io/kopano_changelog/) for a general overview of all updates.

### Changes in Kopano Core 8.6.2 and Kopano4UCS 1.5.0

* the integration has been updated to support the upcoming Kopano Groupware Core 8.7 release
* fix language selection for store creation

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