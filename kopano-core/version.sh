version=$(dpkg-deb -f packages/kopano-server-packages_*.deb version)
echo ${version%-*}-3
