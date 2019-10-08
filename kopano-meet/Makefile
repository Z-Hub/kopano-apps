app_name=kopano-meet
app_version=$(shell ./version.sh)

ucs_version=4.3

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
	appcenter/README appcenter/Long_Description \
	env compose preinst inst uinst settings

generate-docs:
	pandoc appcenter/README.md -t HTML -o appcenter/README
	#pandoc  --ascii appcenter/README_DE.md -t HTML -o appcenter/README_DE
	pandoc appcenter/Long_Description.md -t HTML -o appcenter/Long_Description
	#pandoc  --ascii appcenter/Long_Description_DE.md -t HTML -o appcenter/Long_Description_DE

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
