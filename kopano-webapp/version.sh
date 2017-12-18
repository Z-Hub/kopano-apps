version=$(dpkg-deb -f packages/kopano-webapp_*.deb version)
echo ${version%+*}
