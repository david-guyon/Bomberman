bomberman-quintus
=================

This project is a browser based version of the old Bomberman game with multiplayer feature. 
In this project I use the Quintus JS library for the game engine and the Node.js platform for the server side. 

<img src="https://raw.github.com/dgetux/bomberman-quintus/develop/screenshot/screenshot-1.png" alt="screenshot" />

##Before playing..
you will need to install few things. 

###Node.js

Depending on your operating system, install the nodejs package. I'm using ArchLinux, so I just did a <pre>yaourt -S nodejs</pre>. 

When you install nodejs, you also get the Node Packaged Modules (npm) which is pretty usefull to install modules in your project. 
In a console, 'cd' in the project directory and then run the following command lines to install all dependences the game needs.

<pre>
npm install jade
npm install express
npm install socket.io
</pre>

Then on the same console, run <pre>node app.js</pre> (you should be able to run <pre>node start</pre> but it is apparently not working, I'm on it). Now the server is ready. Launch a browser and go on http://localhost:3000. Here's the game! 

Under this line, things are out of date. I will make important changes soon. Brace yourselves! ;)
------------------

##Last added functions:

* User can move the Player with arrows
* Player cannot go through walls and breakable walls
* Player can drop a bomb with the spacebar. This bomb is displayed during 3 seconds
* When the timeout is triggered, fire blocks are diplayed until they find a wall

##To do:

* Improve all asset images
* Fix few bugs when we navigate at the bottom and at the right of the game area
* Drop items randomly when a breakable block is destroyed
* Add a second user using the Node.js technologie
* Create an UI displaying information for each player
* Fix the bug that the player is behind bombs and fire blocks
