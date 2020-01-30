# Kopano Meet app for Univention Corporate Server (UCS)

This repo contains the integration files to run Meet from the Univention App Center.

## How can I change configuration options that are not exposed through the settings screen?

The app uses `docker-compose` to spin up containers for Kopano Meet. This also means that an override file can be used to seamlessly extend the default configuration file.

To override the current configuration, create a file called `docker-compose.override.yml` in `/var/lib/univention-appcenter/apps/kopano-meet/compose` with the desired options. An example for such a file can be found at https://stash.z-hub.io/projects/K4U/repos/kopano-apps/browse/kopano-meet/docker-compose.override.yml. Afterwards issue `docker-compose up -d` to restart changed containers.

See https://docs.docker.com/compose/extends/ for more information.
