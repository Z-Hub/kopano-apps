app_name=z-push-kopano
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

get-binaries: get-binaries-z-push get-binaries-kopano4ucs

get-binaries-kopano4ucs:
	rm -rf kopano4ucs || exit 0
	mkdir -p kopano4ucs || exit 0
	osc getbinaries kopano4ucs kopano4ucs-release Univention_4.3 x86_64 -d kopano4ucs
	rm packages/kopano4ucs*.deb || exit 0
	cp kopano4ucs/kopano4ucs-z-push*.deb packages/

get-binaries-z-push:
	rm -rf packages || exit 0
	mkdir -p packages|| exit 0
	osc getbinaries z-push:final z-push Univention_4.3 x86_64 -d packages


appcenter-files: generate-docs
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	packages/*.deb settings \
	appcenter/README_UPDATE_EN

generate-docs:
	pandoc appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE_EN
	pandoc --ascii appcenter/README_UPDATE.md -t HTML -o appcenter/README_UPDATE_DE

# Testing
