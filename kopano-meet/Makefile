app_name=kopano-meet
app_version=$(shell ./version.sh)

ucs_version=4.4

docker_name="kopano/konnectd:$(app_version)"

all: release

release: release-prepare release-update

release-prepare: add-version

release-run: run

release-update: appcenter-files

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

clean:
	sudo docker rm $(app_name) || true

appcenter-files: generate-docs
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	appcenter/README appcenter/README_DE appcenter/README_UPDATE appcenter/README_APPLIANCE appcenter/README_APPLIANCE_DE \
	appliance_hook env compose configure_host preinst inst uinst settings test

generate-docs:
	pandoc appcenter/README.md -t HTML -o appcenter/README
	pandoc --email-obfuscation=none appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE
	pandoc  --ascii appcenter/README_DE.md -t HTML -o appcenter/README_DE
	pandoc appcenter/Full_Description.md -t HTML -o appcenter/Full_Description
	pandoc  --ascii appcenter/Full_Description_DE.md -t HTML -o appcenter/Full_Description_DE
	pandoc appcenter/README_APPLIANCE.md -t HTML -o appcenter/README_APPLIANCE
	pandoc appcenter/README_APPLIANCE_DE.md -t HTML -o appcenter/README_APPLIANCE_DE

run:
	@docker-compose -f compose ps

# Testing
test-clean:
	univention-app remove kopano-meet || true

test-update-appcenter:
	univention-app update

test-install: test-update-appcenter
	univention-app install kopano-meet
	read wait

test-upgrade-latest: test-update-appcenter
	univention-app upgrade kopano-meet

test: test-clean test-install
