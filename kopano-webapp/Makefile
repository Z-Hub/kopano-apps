app_name=kopano-webapp
app_version=$(shell ./version.sh)

ucs_version=5.0

#docker_repo=fbartels
#docker_name=univention-mattermost
#docker_login=`cat ~/.docker-account-user`
#docker_pwd=`cat ~/.docker-account-pwd`

all: get-binaries get-core-dependencies add-version appcenter-files

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	#univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true
	univention-appcenter-control new-version "4.4/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

# TODO check if these are enough to satisfy package dependencies when installed separately from the core app
get-core-dependencies:
	for pkg in libgsoap-kopano libkcutil0 libmapi1 libkcfreebusy0 libkcsoap kopano-lang kopano-client libkcicalmapi0 libkcinetmapi0 php7-mapi; do \
		cp kopano-core-dependencies/$$pkg*.deb packages ; \
	done

# get-binaries-files files:final does not reliably give actual final releases, so drop it for now
get-binaries: get-binaries-webapp get-binaries-files get-binaries-mdm get-binaries-smime get-binaries-kopano4ucs

get-binaries-webapp:
	rm -rf packages || exit 0
	mkdir -p packages|| exit 0
	osc getbinaries webapp:final Univention_5.0 x86_64 -d packages
get-binaries-files:
	osc getbinaries files:final Univention_5.0 x86_64 -d packages
	wget http://ftp.de.debian.org/debian/pool/main/p/php-smbclient/php-smbclient_0.8.0-3_amd64.deb -P packages

get-binaries-mdm:
	osc getbinaries mdm:final Univention_5.0 x86_64 -d packages

get-binaries-smime:
	osc getbinaries smime:final Univention_5.0 x86_64 -d packages

get-binaries-kopano4ucs:
	rm -rf kopano4ucs || exit 0
	mkdir -p kopano4ucs || exit 0
	osc getbinaries kopano4ucs kopano4ucs Univention_4.4 x86_64 -d kopano4ucs
	rm packages/kopano4ucs*.deb || exit 0
	cp kopano4ucs/kopano4ucs-lib*.deb packages/
	cp kopano4ucs/kopano4ucs-webapp*.deb packages/

appcenter-files: generate-docs
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	packages/*.deb settings \
	appcenter/README_UPDATE_DE appcenter/README_UPDATE_EN appcenter/README_EN appcenter/README_DE appcenter/README_POST_INSTALL

generate-docs:
	pandoc appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE_EN
	pandoc --ascii appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE_DE
	pandoc appcenter/README.md -t HTML -o appcenter/README_EN
	pandoc --ascii appcenter/README.md -t HTML -o appcenter/README_DE
	pandoc appcenter/README_POST_INSTALL.md -t HTML -o appcenter/README_POST_INSTALL
	pandoc appcenter/Long_Description.md -t HTML -o appcenter/Long_Description
	pandoc  --ascii appcenter/Long_Description_DE.md -t HTML -o appcenter/Long_Description_DE

# Testing
