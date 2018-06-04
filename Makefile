update-core-binaries:
	rm -rf kopano-core-dependencies || exit 0
	mkdir -p kopano-core-dependencies || exit 0
	osc getbinaries core:final:dist a_aggregate Univention_4.3 x86_64 -d kopano-core-dependencies
