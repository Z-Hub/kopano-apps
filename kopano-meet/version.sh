#!/bin/bash
docker_tag_search () {
        set +e
        # Display help
        if [[ "${1}" == "" ]]; then
                echo "Usage: docker tags repo/image"
                echo "       docker tags image"
                return
        fi

        # Full repo/image was supplied
        if [[ $1 == *"/"* ]]; then
                name=$1

        # Only image was supplied, default to library/image
        else
                name=library/${1}
        fi
        #printf "Searching tags for ${name}"

        # Fetch all pages, because the only endpoint supporting pagination params
        # appears to be tags/lists, but that needs authorization
        results=""
        i=0
        has_more=0
        while [ $has_more -eq 0 ]; do
                i=$((i+1))
                result=$(curl "https://registry.hub.docker.com/v2/repositories/${name}/tags/?page=${i}" 2>/dev/null | jq -r '."results"[]["name"]' 2>/dev/null)
                has_more=$?
                if [[ -n "${result// }" ]]; then results="${results} ${result}"; fi
                        #printf "."
        done

        echo "$results" | xargs -n1 | sort -ru | xargs
}

docker_tag_search kopano/kopano_meet | cut -d " " -f 2 | xargs basename
