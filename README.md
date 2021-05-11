# App source for Kopano UCS apps

The master branch of this repository follows the current release of UCS, which at this point in time is 5.0.

Please check other branches (e.g. 4.3) for app sources of other UCS releases.

## Checklist for adding new UCS releases

- update Makefile in the root of the directory and make sure `update-core-binaries` succeeds
- The newer UCS release should be a copy of the same version available for the previous release
  - Update app version for previous release
  - run a modified `add-version`, but copy from the last release instead of the current one. e.g. `univention-appcenter-control new-version "4.4/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true`
  