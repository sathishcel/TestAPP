# ewa_backend
MIgration command for Organization and ThemeSettings
Create:
------------------
Intial Setup
================================
./node_modules/db-migrate/bin/db-migrate up
./node_modules/db-migrate/bin/db-migrate down -c 6

For any changes in database 
=================================
./node_modules/db-migrate/bin/db-migrate down -c 6
./node_modules/db-migrate/bin/db-migrate up

node config/seeds.js

For Pre-defined themes
==================================
defaultSkinColor: #F44336;

Foreground Color
------------------------
redColor : #F44336;
pinkColor: #E91E63;
purpleColor: #9C27B0;
deepPurpleColor: #673AB7;
indigoColor: #3F51B5;
blueColor: #2196F3;

Background Color
------------------------
backgroundColor: #e9e9e9
