app_name=kopano-api
app_version=$(shell ./version.sh)

ucs_version=4.2

#docker_name="kopano/kapid:$(app_version)"
docker_name="kopano/kopano_rest-api"

hostname=$(shell hostname -f)
PUID=$(shell id -u kopano)
PGID=$(shell id -g kopano)

all: run
#build run

release: release-prepare release-update

release-prepare: add-version
	echo "remember to update the used Docker image in the provider portal"
	echo "e.g. $(docker_name)"

release-run: run-mounted

release-update: appcenter-files appcenter-files-docker

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

pull:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	if [ `systemctl is-active docker` = "inactive" ] ; then sudo systemctl start docker; fi
	sudo docker pull $(docker_name)

run: pull clean
	sudo docker run -it --rm --name=$(app_name) \
	--volume /run/kopano:/run/kopano \
	--volume /etc/kopano/pubs-encryption.hex:/run/secrets/kopano-kapid_pubs_secret_key:ro \
	--env KOPANO_KAPID_MFR_USER=$(shell id -u kopano) \
	--env-file ./env \
	--publish 127.0.0.1:8039:8039 \
	$(docker_name)

clean:
	sudo docker rm $(app_name) || true

appcenter-files: generate-docs
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	appcenter/README_EN \
	env preinst inst uinst settings

appcenter-files-docker:
	univention-appcenter-control set --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	--json '{"DockerImage": $(docker_name)}'

generate-docs:
	pandoc appcenter/README_EN.md -t HTML -o appcenter/README_EN
	#pandoc  --ascii appcenter/README_DE.md -t HTML -o appcenter/README_DE
	#pandoc  appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE
	#pandoc  --ascii README.md -t HTML -o README.html

# Testing
test-clean:
	univention-app remove kopano-konnect || true

test-update-appcenter:
	univention-app update

test-install: test-update-appcenter
	univention-app install kopano-konnect
	read wait

test-upgrade-latest: test-update-appcenter
	univention-app upgrade kopano-konnect

test: test-clean test-install
