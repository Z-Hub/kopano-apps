#curl -s 'https://download.kopano.io/community/konnect:/' | grep -oP 'href="/community/konnect:/kopano-konnect-\K[0-9]+\.[0-9]+\.[0-9]+\-[0-9]+|href="/community/konnect:/kopano-konnect-\K[0-9]+\.[0-9]+\.[0-9]+' | sort -t. -rn -k1,1 -k2,2 -k3,3 | head -1
echo latest
