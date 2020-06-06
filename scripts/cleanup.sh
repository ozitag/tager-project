mkdir .tager
mv assets .tager/assets
mv config.json .tager/config.json
cp scripts/admin-config.js .tager/scripts/admin-config.js
rm -rf scripts
rm -rf projects
rm -rf ./init*.sh
rm -rf .git
git init
git add -A .
git commit -m 'init commit'