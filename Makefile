update-core-binaries:
	rm -rf kopano-core-dependencies || exit 0
	mkdir -p kopano-core-dependencies || exit 0
	osc getbinaries core:final:dist a_aggregate Univention_4.3 x86_64 -d kopano-core-dependencies

update-appcenter: update-appcenter-core update-appcenter-webapp update-appcenter-z-push

update-docs:
	cd kopano-core && make generate-docs
	cd kopano-webapp && make generate-docs
	cd kopano-webmeetings && make generate-docs

update-appcenter-core:
	cd kopano-core && make appcenter-files

update-appcenter-webapp:
	cd kopano-webapp && make appcenter-files

update-appcenter-z-push:
	cd z-push-kopano && make appcenter-files
