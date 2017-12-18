version=$(dpkg-deb -f packages/kopano-webapp-plugin-meetings_*.deb version)
echo ${version%+*}
