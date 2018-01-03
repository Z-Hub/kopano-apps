app_name=kopano-webmeetings
app_version=$(shell ./version.sh)

ucs_version=4.3

#docker_repo=fbartels
#docker_name=univention-mattermost
#docker_login=`cat ~/.docker-account-user`
#docker_pwd=`cat ~/.docker-account-pwd`

all: get-binaries get-core-dependencies add-version appcenter-files

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

get-core-dependencies:
	for pkg in python-mapi python-kopano kopano-presence kopano-common; do \
		cp kopano-core-dependencies/$$pkg*.deb packages ; \
	done

get-binaries:
	rm -rf packages || exit 0
	mkdir -p packages|| exit 0
	osc getbinaries webmeetings:final kopano-webapp-plugin-meetings Debian_9.0 x86_64 -d packages
	osc getbinaries webmeetings:final kopano-webmeetings Debian_9.0 x86_64 -d packages

appcenter-files: generate-docs
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	packages/*.deb \
	appcenter/README appcenter/README_DE appcenter/README_POST_INSTALL appcenter/README_POST_INSTALL_DE appcenter/README_UPDATE

generate-docs:
	pandoc appcenter/README.md -t HTML -o appcenter/README
	pandoc --ascii appcenter/README_DE.md -t HTML -o appcenter/README_DE
	pandoc appcenter/README_POST_INSTALL.md -t HTML -o appcenter/README_POST_INSTALL
	pandoc --ascii appcenter/README_POST_INSTALL.md -t HTML -o appcenter/README_POST_INSTALL_DE
	pandoc appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE

# Testing
