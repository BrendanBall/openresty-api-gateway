start: `nginx -p \`pwd\` -c conf/nginx.conf`

restart: `nginx -p \`pwd\` -s reload`

install dependencies: `opm get pintsized/lua-resty-http`