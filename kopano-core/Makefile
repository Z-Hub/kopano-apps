app_name=kopano-core
app_version=$(shell ./version.sh)

ucs_version=5.0

#docker_repo=kopano
#docker_name=univention-kopano-core
#docker_login=`cat ~/.docker-account-user`
#docker_pwd=`cat ~/.docker-account-pwd`

all: get-binaries add-version appcenter-files

add-version:
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	#univention-appcenter-control new-version "$(ucs_version)/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true
	univention-appcenter-control new-version "4.4/$(app_name)" "$(ucs_version)/$(app_name)=$(app_version)" || true

get-binaries: get-binaries-core get-binaries-kopano4ucs

get-binaries-core:
	rm -rf packages || exit 0
	mkdir -p packages || exit 0
	osc getbinaries core:final:dist a_aggregates Univention_5.0 x86_64 -d packages
	#osc getbinaries core:final:dist a_aggregate Univention_4.3 x86_64 -d packages

get-binaries-kopano4ucs:
	rm -rf kopano4ucs || exit 0
	mkdir -p kopano4ucs || exit 0
	osc getbinaries kopano4ucs kopano4ucs Univention_4.4 x86_64 -d kopano4ucs
	rm packages/kopano4ucs*.deb || exit 0
	cp kopano4ucs/kopano4ucs-app_*.deb packages/
	cp kopano4ucs/kopano4ucs-lib_*.deb packages/
	cp kopano4ucs/kopano4ucs-multiserver*.deb packages/
	cp kopano4ucs/kopano4ucs-schema*.deb packages/
	cp kopano4ucs/kopano4ucs-udm*.deb packages/
	cp kopano4ucs/kopano4ucs_*.deb packages/
	# the following wget lines can be removed once https://forge.univention.org/bugzilla/show_bug.cgi?id=47933 is resolved
	wget -nc https://updates.software-univention.de/4.3/unmaintained/4.3-0/amd64/libhx28_3.22-1+b2_amd64.deb -P packages/
	wget -nc https://updates.software-univention.de/4.3/unmaintained/4.3-0/amd64/python3-bsddb3_6.1.0-1+b2_amd64.deb -P packages/
	wget -nc https://appcenter-test.software-univention.de/univention-repository/4.3/maintained/component/kopano-core_20181112170522/amd64/python3-xapian_1.4.3-1_amd64.deb -P packages/

appcenter-files: generate-docs
	if [ -z ${app_version} ] ; then echo "no target app_version specified"; exit 13; fi
	univention-appcenter-control upload --noninteractive $(ucs_version)/$(app_name)=$(app_version) \
	packages/*.deb settings \
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

# Testing
