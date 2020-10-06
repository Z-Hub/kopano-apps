#!/bin/bash
#grep kopano/kopano_meet: compose | cut -d: -f3
echo "$(grep fbartels/kopano_meet: compose | cut -d: -f3 | cut -d@ -f1)-2"
