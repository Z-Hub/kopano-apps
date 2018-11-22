version=$(dpkg-deb -f packages/kopano-server-packages_*.deb version)
#echo ${version%-*}
echo 8.6.8.2
