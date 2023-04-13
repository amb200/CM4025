# CM4025

Instructions:
-install mongodb from https://www.mongodb.com/try/download/community

(if there are issues with node it needs to be cleared/reinstalled)
sudo apt-get remove nodejs
sudo apt-get remove npm
sudo rm -rf ~/.npm
sudo rm -rf /usr/local/lib/node_modules
sudo apt install curl
curl -0 -L https://npmjs.org/install.sh | sudo sh

(in terminal with main app folder as location)
-npm install express

(in a seperate terminal)
-mongod --dbpath (path to where you want the database)

(in terminal with main app folder as location)
-node app.js

-open browser and go to localhost:3000
