app_name=kopano-webapp
app_version=$(shell ./version.sh)

ucs_version=4.2

#docker_repo=fbartels
#docker_name=univention-mattermost
#docker_login=`cat ~/.docker-account-user`
#docker_pwd=`cat ~/.docker-account-pwd`

all: get-binaries get-core-dependencies add-version appcenter-files

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

get-core-dependencies:
	for pkg in libgsoap-kopano-2-8 libkcutil0 libkcmapi0 libmapi1 libkcfreebusy0 libkcsoapclient0 libkcssl0 libkcsync0 kopano-lang kopano-client kopano-contacts libkcicalmapi0 libvmime-kopano0 libkcinetmapi0 php5-mapi; do \
		cp kopano-core-dependencies/$$pkg*.deb packages ; \
	done

get-binaries:
	rm -rf packages || exit 0
	mkdir -p packages|| exit 0
	rm -rf kopano4ucs || exit 0
	mkdir -p kopano4ucs|| exit 0
	osc getbinaries kopano4ucs kopano4ucs-release Univention_4.0 x86_64 -d kopano4ucs
	cp kopano4ucs/kopano4ucs-lib*.deb packages/
	cp kopano4ucs/kopano4ucs-webapp*.deb packages/
	osc getbinaries webapp:final kopano-webapp Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-desktopnotifications Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-filepreviewer Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-intranet Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-de-at Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-de-ch Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-de-de Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-en-gb Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-en-us Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-es-es Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-fr-fr Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-it-it Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-nl-nl Univention_4.2 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-pl-pl Univention_4.2 x86_64 -d packages

	osc getbinaries files:final kopano-webapp-plugin-files Univention_4.2 x86_64 -d packages
	osc getbinaries files:final kopano-webapp-plugin-filesbackend-owncloud Univention_4.2 x86_64 -d packages
	osc getbinaries files:final kopano-webapp-plugin-filesbackend-smb Univention_4.2 x86_64 -d packages

	osc getbinaries mdm:final kopano-webapp-plugin-mdm Univention_4.2 x86_64 -d packages
	osc getbinaries smime:final kopano-webapp-plugin-smime Univention_4.2 x86_64 -d packages

appcenter-files: generate-docs
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	packages/*.deb \
	appcenter/README_UPDATE_EN

generate-docs:
	pandoc appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE_EN
	pandoc --ascii appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE_DE

# Testing
