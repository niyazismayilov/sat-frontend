#!/bin/sh -eu
cd /usr/share/nginx/html

export ENV_DEST=config
env-gen

cat config/env.js | tr -d '\n' > env.txt
sed -e "s/__ENV__/$(sed 's:/:\\/:g' env.txt)/" index.html > index.html.injected
rm index.html env.txt config/env.js
mv index.html.injected index.html

nginx -g "daemon off;"
