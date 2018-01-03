update-core-binaries:
	rm -rf kopano-core-dependencies || exit 0
	mkdir -p kopano-core-dependencies || exit 0
	osc getbinaries core:final:dist a_aggregate Debian_9.0 x86_64 -d kopano-core-dependencies
