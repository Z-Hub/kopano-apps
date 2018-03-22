app_name=kopano-konnect
app_version=$(shell ./version.sh)

ucs_version=4.2

docker_name="kopano/konnectd:$(app_version)"

hostname=$(shell hostname -f)

all: run
#build run

release: release-prepare release-update

release-prepare: add-version
	echo "remember to update the used Docker image in the provider portal"
	echo "e.g. $(docker_name)"

release-run: run-mounted

release-update: appcenter-files

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

pull:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	if [ `systemctl is-active docker` = "inactive" ] ; then sudo systemctl start docker; fi
	sudo docker pull $(docker_name)

run: pull clean
	sudo docker run -it \
	-p 8777:8777 \
	--name=$(app_name) $(docker_name) serve --iss=https://$(hostname) kc

clean:
	sudo docker rm $(app_name) || true

appcenter-files: generate-docs
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	appcenter/README_EN
	#minio.inst minio.preinst minio.uinst minio.configure_host minio.settings minio.env \
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
