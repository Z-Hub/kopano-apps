Please see [Kopano Changelog](https://documentation.kopano.io/kopano_changelog/) for a general overview of all updates.

### Changes in Kopano4UCS 1.4 and Kopano WebApp 3.4.15

* update Kopano Core dependencies to 8.5.9. **Please update the Kopano Core app first, if you have both app running on the same server!**
* directly depend on php7 packages to resolve issues with packages choosing php5 variants when resolving dependencies.
* add provisions in join script to force usage of php7.
* **Important**: This update of Kopano WebApp includes active measurements to improve cookie security. Due to this connections through plain http connections will give a ´Bad Request´ error. It is recommended to only connect to WebApp through https secured connections (for example by setting `ucr set apache2/force_https=yes`).

### Changes in Kopano WebApp 3.3 final (3.3.0.610) and Kopano4UCS 1.3.1  

*   the Kopano Core dependencies have been updated to 8.3.1. **Please update the Kopano Core app first, if you have both app running on the same server!**
*   Kopano WebApp has been updated to version 3.3.
*   Kopano4UCS now uses the dedicated Univention 4.2 repositories, instead of the Debian 8.0 ones.
