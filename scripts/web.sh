git clone git@github.com:ozitag/tager-web.git web
rm -rf web/.git
mkdir docker/web
cp web/Dockerfile docker/web/Dockerfile
cp web/.env.example web/.env

cp -R assets/* web/public
cp assets/favicon/favicon.ico web/public/favicon.ico