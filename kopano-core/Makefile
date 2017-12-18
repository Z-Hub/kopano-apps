app_name=kopano-core
app_version=$(shell ./version.sh)

ucs_version=4.2

#docker_repo=fbartels
#docker_name=univention-mattermost
#docker_login=`cat ~/.docker-account-user`
#docker_pwd=`cat ~/.docker-account-pwd`

all: get-binaries add-version appcenter-files

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

get-binaries:
	rm -rf packages || exit 0
	mkdir -p packages|| exit 0
	rm -rf kopano4ucs || exit 0
	mkdir -p kopano4ucs|| exit 0
	osc getbinaries kopano4ucs kopano4ucs-release Univention_4.0 x86_64 -d kopano4ucs
	cp kopano4ucs/kopano4ucs-lib_*.deb packages/
	cp kopano4ucs/kopano4ucs-multiserver_*.deb packages/
	cp kopano4ucs/kopano4ucs-schema_*.deb packages/
	cp kopano4ucs/kopano4ucs-udm_*.deb packages/
	cp kopano4ucs/kopano4ucs_*.deb packages/
	osc getbinaries core:final:dist a_aggregate Univention_4.2 x86_64 -d packages

appcenter-files: generate-docs
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	packages/*.deb \
	appcenter/README appcenter/README_DE appcenter/README_INSTALL appcenter/README_INSTALL_DE appcenter/README_UPDATE

generate-docs:
	pandoc appcenter/README.md -t HTML -o appcenter/README
	pandoc  --ascii appcenter/README_DE.md -t HTML -o appcenter/README_DE
	pandoc appcenter/README_INSTALL.md -t HTML -o appcenter/README_INSTALL
	pandoc  --ascii appcenter/README_INSTALL_DE.md -t HTML -o appcenter/README_INSTALL_DE
	pandoc appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE

# Testing
