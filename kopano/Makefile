app_name=kopano
app_version=$(shell ./version.sh)

ucs_version=4.3

#docker_repo=kopano
#docker_name=univention-kopano-core
#docker_login=`cat ~/.docker-account-user`
#docker_pwd=`cat ~/.docker-account-pwd`

all: add-version appcenter-files

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true
	#univention-appcenter-control new-version "4.2/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

appcenter-files: generate-docs
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	preinst settings \
	appcenter/README appcenter/README_DE appcenter/README_INSTALL appcenter/README_INSTALL_DE \
	appcenter/README_UPDATE appcenter/README_APPLIANCE appcenter/README_APPLIANCE_DE appcenter/README_POST_INSTALL

generate-docs:
	pandoc appcenter/README.md -t HTML -o appcenter/README
	pandoc  --ascii appcenter/README_DE.md -t HTML -o appcenter/README_DE
	pandoc appcenter/README_INSTALL.md -t HTML -o appcenter/README_INSTALL
	pandoc  --ascii appcenter/README_INSTALL_DE.md -t HTML -o appcenter/README_INSTALL_DE
	pandoc appcenter/README_APPLIANCE.md -t HTML -o appcenter/README_APPLIANCE
	pandoc  --ascii appcenter/README_APPLIANCE_DE.md -t HTML -o appcenter/README_APPLIANCE_DE
	pandoc appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE
	pandoc appcenter/README_POST_INSTALL.md -t HTML -o appcenter/README_POST_INSTALL
	pandoc appcenter/Long_Description.md -t HTML -o appcenter/Long_Description
	pandoc  --ascii appcenter/Long_Description_DE.md -t HTML -o appcenter/Long_Description_DE
