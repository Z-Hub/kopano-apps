Please see [Kopano Changelog](https://documentation.kopano.io/kopano_changelog/) for a general overview of all updates.

### Changes in Kopano4UCS 1.7.0 and Kopano WebApp 4.7.0

* updates integration packages for UCS 5.0
* please have a look at the dedicated changelog for WebApp to see updates until the 4.7.0 release: [https://documentation.kopano.io/kopano_changelog/webapp.html](https://documentation.kopano.io/kopano_changelog/webapp.html)

### Changes in Kopano4UCS 1.6.6 and Kopano WebApp 3.5.14-2

* adds new package `kopano4ucs-app` to this app to allow installing Kopano WebApp on a dedicated system

### Changes in Kopano4UCS 1.6.6 and Kopano WebApp 3.5.14-1

* replaces beta packages of Kopano Files with the last version that was released as final
* In case you are experiencing high Apache load or WebApp displaying "an unexpected error" upon login after the previous update please run the following command after updating to this version:
* ``univention-install kopano-webapp-plugin-files=2.1.5.305+101.2 kopano-webapp-plugin-filesbackend-owncloud=2.1.0.87+42.5 kopano-webapp-plugin-filesbackend-smb=2.1.0.50+31.5``

### Changes in Kopano4UCS 1.6.6 and Kopano WebApp 3.5.14

* update WebApp packages to add support for signing in via OpenID Connect
* Please check the [ucs-oidc-webapp](https://github.com/Kopano-dev/ucs-oidc-webapp) project for instructions on setting up OIDC login with Kopano WebApp
* please have a look at the dedicated changelog for WebApp to see updates until the 3.5.14 release: [https://documentation.kopano.io/kopano_changelog/webapp.html](https://documentation.kopano.io/kopano_changelog/webapp.html)

### Changes in Kopano4UCS 1.5.33 and Kopano WebApp 3.5.5

* update integration package for UCS 4.4
* please have a look at the dedicated changelog for WebApp to see updates until the 3.5.5 release: [https://documentation.kopano.io/kopano_changelog/webapp.html](https://documentation.kopano.io/kopano_changelog/webapp.html)

### Changes in Kopano4UCS 1.5.27 and Kopano WebApp 3.5.2

* Small tweaks to the Univention theme
* please have a look at the dedicated changelog for WebApp to see updates until the 3.5.2 release: [https://documentation.kopano.io/kopano_changelog/webapp.html](https://documentation.kopano.io/kopano_changelog/webapp.html)

### Changes in Kopano4UCS 1.5.13 and Kopano WebApp 3.4.22

* it is now possible to manage the Kopano apt repository through the `App Settings` option in the App Center.
* the app now uses the official repository for UCS 4.3
* please have a look at the dedicated changelog for WebApp to see updates until the 3.4.22 release: https://documentation.kopano.io/kopano_changelog/webapp.html

### Changes in Kopano4UCS 1.4.17 and Kopano WebApp 3.4.19

* app now uses the WebApp packages compiled for Univention 4.3 (repo file will be updated once all plugins are officially released for 4.3)
* add basic json theme with Univention branding
    * See [KW-2564](https://jira.kopano.io/browse/KW-2564) and the [Kopano Blog](https://kopano.com/blog/new-json-themes-in-kopano-webapp/) on how to create your own theme

### Changes in Kopano4UCS 1.4 and Kopano WebApp 3.4.15

* update Kopano Core dependencies to 8.5.9. **Please update the Kopano Core app first, if you have both app running on the same server!**
* directly depend on php7 packages to resolve issues with packages choosing php5 variants when resolving dependencies.
* add provisions in join script to force usage of php7.
* **Important**: This update of Kopano WebApp includes active measurements to improve cookie security. Due to this connections through plain http connections will give a `Bad Request` error. It is recommended to only connect to WebApp through https secured connections (for example by setting `ucr set apache2/force_https=yes`).
* remove plain http links from portal page

### Changes in Kopano WebApp 3.3 final (3.3.0.610) and Kopano4UCS 1.3.1  

*   the Kopano Core dependencies have been updated to 8.3.1. **Please update the Kopano Core app first, if you have both app running on the same server!**
*   Kopano WebApp has been updated to version 3.3.
*   Kopano4UCS now uses the dedicated Univention 4.2 repositories, instead of the Debian 8.0 ones.
