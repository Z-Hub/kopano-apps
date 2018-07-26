app_name=kopano-playground
app_version=latest

ucs_version=4.2

docker_name="kopano/univention-playground:$(app_version)"
docker_login=`cat ~/.docker-account-user`
docker_pwd=`cat ~/.docker-account-pwd`

all: build run

release: release-prepare build release-update

release-prepare: add-version
	echo "remember to update the used Docker image in the provider portal"
	echo "e.g. $(docker_name)"

release-update: appcenter-files publish appcenter-files-docker

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

build:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	if [ `systemctl is-active docker` = "inactive" ] ; then sudo systemctl start docker; fi
	sudo docker build -t $(docker_name) .

run: build clean
	sudo docker run -it --rm --name=$(app_name) \
	--publish=8888:8888 \
	$(docker_name)

clean:
	sudo docker rm $(app_name) || true

repo-login:
	sudo docker login -u $(docker_login) -p $(docker_pwd)

# Docker publish
publish: repo-login publish-latest

publish-latest: tag-latest
	@echo 'publish latest to $(docker_repo)'
	sudo docker push $(docker_name)

# Docker tagging
tag: tag-latest

tag-latest:
	@echo 'create tag latest'
	sudo docker tag $(docker_name) $(docker_name)

appcenter-files: generate-docs
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	appcenter/README_EN \
	inst uinst

appcenter-files-docker:
	univention-appcenter-control set --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	--json '{"DockerImage": $(docker_name)}'

generate-docs:
	pandoc appcenter/README_EN.md -t HTML -o appcenter/README_EN
	#pandoc  --ascii appcenter/README_DE.md -t HTML -o appcenter/README_DE
	#pandoc  appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE
	#pandoc  --ascii README.md -t HTML -o README.html
