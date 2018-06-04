app_name=kopano-webapp
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
	for pkg in libgsoap-kopano libkcutil0 libkcmapi0 libmapi1 libkcfreebusy0 libkcsoap libkcssl0 libkcsync0 kopano-lang kopano-client kopano-contacts libkcicalmapi0 libvmime-kopano libkcinetmapi0 php7-mapi; do \
		cp kopano-core-dependencies/$$pkg*.deb packages ; \
	done

get-binaries: get-binaries-webapp get-binaries-files get-binaries-mdm get-binaries-smime get-binaries-kopano4ucs

get-binaries-webapp:
	rm -rf packages || exit 0
	mkdir -p packages|| exit 0
	osc getbinaries webapp:final kopano-webapp Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-desktopnotifications Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-filepreviewer Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-intranet Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-mattermost Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-de-at Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-de-ch Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-de-de Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-en-gb Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-en-us Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-es-es Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-fr-fr Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-it-it Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-nl-nl Debian_9.0 x86_64 -d packages
	osc getbinaries webapp:final kopano-webapp-plugin-spell-pl-pl Debian_9.0 x86_64 -d packages

get-binaries-files:
	osc getbinaries files:final kopano-webapp-plugin-files Debian_9.0 x86_64 -d packages
	osc getbinaries files:final kopano-webapp-plugin-filesbackend-owncloud Debian_9.0 x86_64 -d packages
	osc getbinaries files:final kopano-webapp-plugin-filesbackend-smb Debian_9.0 x86_64 -d packages
	wget http://ftp.de.debian.org/debian/pool/main/p/php-smbclient/php-smbclient_0.8.0-3_amd64.deb -P packages

get-binaries-mdm:
	osc getbinaries mdm:final kopano-webapp-plugin-mdm Debian_9.0 x86_64 -d packages

get-binaries-smime:
	osc getbinaries smime:final kopano-webapp-plugin-smime Debian_9.0 x86_64 -d packages
	osc getbinaries smime:final php-kopano-smime Debian_9.0 x86_64 -d packages

get-binaries-kopano4ucs:
	rm -rf kopano4ucs || exit 0
	mkdir -p kopano4ucs || exit 0
	osc getbinaries kopano4ucs kopano4ucs-release Univention_4.3 x86_64 -d kopano4ucs
	rm packages/kopano4ucs*.deb || exit 0
	cp kopano4ucs/kopano4ucs-lib*.deb packages/
	cp kopano4ucs/kopano4ucs-webapp*.deb packages/

appcenter-files: generate-docs
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	packages/*.deb \
	appcenter/README_UPDATE_EN

generate-docs:
	pandoc appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE_EN
	pandoc --ascii appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE_DE

# Testing
