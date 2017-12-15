version=$(dpkg-deb -f packages/z-push-common_*.deb version)
echo ${version%+*}
