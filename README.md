# SSG

Subscribe to SSG!
https://www.youtube.com/@SSG_Productions

## Deployment
Here are some other deployment options to deploy the site on your own.

[![Run on Replit](https://raw.githubusercontent.com/BinBashBanana/deploy-buttons/master/buttons/remade/replit.svg)](https://replit.com/github/beforeblazergithub/BlazerGames)
<br>
[![Deploy to Heroku](https://raw.githubusercontent.com/BinBashBanana/deploy-buttons/master/buttons/remade/heroku.svg)](https://heroku.com/deploy/?template=https://github.com/beforeblazergithub/BlazerGames)
<br>
[![Deploy to IBM Cloud](https://raw.githubusercontent.com/BinBashBanana/deploy-buttons/master/buttons/remade/ibmcloud.svg)](https://cloud.ibm.com/devops/setup/deploy?repository=https://github.com/beforeblazergithub/BlazerGames)
<br>
[![Deploy to Amplify Console](https://raw.githubusercontent.com/BinBashBanana/deploy-buttons/master/buttons/remade/amplifyconsole.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/beforeblazergithub/BlazerGames)
<br>
[![Run on Google Cloud](https://raw.githubusercontent.com/BinBashBanana/deploy-buttons/master/buttons/remade/googlecloud.svg)](https://deploy.cloud.run/?git_repo=https://github.com/beforeblazergithub/BlazerGames)
<br>
[![Remix on Glitch](https://binbashbanana.github.io/deploy-buttons/buttons/remade/glitch.svg)](https://glitch.com/edit/#!/import/github/beforeblazergithub/BlazerGames)
<br>
[![Deploy To Koyeb](https://binbashbanana.github.io/deploy-buttons/buttons/remade/koyeb.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/beforeblazergithub/BlazerGames)


To connect to agar server:
https://github.com/UnRealm/agario-private-server


This is the client version of the all know browser game Agario. You can play Agario and enjoy it. We are inspired by the Agario game that released Sigmally team https://sigmally.com/ At this repository, you can find useful code that will help you create an agario custom client and you will be able to play custom Agario. All you need is to create a client and specify the server you want to connect to. To do this you need to press F12 in your browser, select the "Console" page, and type setServer(IP: port); For example, if you want to connect to the server with IP 120.0.0.1:8080 you should type setServer(127.0.0.1:8081); To pull these project to your server you need a type for you Ubuntu server next commands on your new folder

git pull origin master.
The most detailed manual (instruction) on creating your own server l2.

Unlike other manuals, which show an example of installation for only one server build, I talk about servers in general. Ie.t.chto read this manual, you will understand what is based on the game platforms and learn to put absolutely any assembly for your own server

Good afternoon, dear readers. This manual was written specifically for lasteam.ru and based on the misunderstanding of beginners and painted as much as possible in detail. It has everything you need to create your own server l2.

Well, let's begin...

First, we need the main part to create our server - the Build itself. There are many teams releasing this build. They all differ in quality and chronicles. What either advice I will not give here, because the choice is great, and many have something that is not. The most popular are l2jfree, l2jserver, l2emu, dream, oneo...

They are all set up pretty much the same way, there are only a couple of differences in syntax. I will show you only the basic changes in the l2 server configuration files, all other changes (raits, drops...) you can find in other files, in the folder named config

... But first, I will tell you the structure of the server itself. The server itself is made up of the Login Server (Player Authentication Server) and the game server (where the player plays directly). When creating your own server, you will need to run both on your machine: for the player's ability to authorize on your server and directly play (on the game server).

Let's assume that we have already downloaded the game build of the team we like and the necessary chronicles. Well, let's install it, but first we need to install the database (mySQL)

mySQL - DB (Data Base, or more simply the database) is installed as a service on the computer on which you want to create your own server l2. In it just the assembly, which is probably already on your computer, will record all the information: the created accounts, players, drop off from mobs, and so on. This program you can always download from the manufacturer's website (google), but I suggest you put such an interesting package as Denwer, which already includes mysql, but it includes such goodies as Apache, PhP and a lot of strange letters, which together create a professional website, which you can see after installing the Denwer package by entering in your browser link 127.0.0.1 (standard IP address of your computer), but it is already creating a site and will not get ahead. I will only say that it is better to put it.

Let's assume that we have set this package and now proceed to configure the server itself. The server is better not to put it in the folder with a Russian name, as most builds may have problems when running. It is also possible that when you downloaded and unpacked the server, there were a few more strange archives - it's so you present separately datapack (all kinds of nonsense, such as dialogues, sold items. In the archive you need to find the folder data and put it after unpacking into your Game Server, so it was next to folders config, log ...), Login server (probably there will not be a folder named login, and some dist. Unzip it and rename it to login to get the folder_with_Server/login/config or folder_with_Server/login/log structure) and Game Server (maybe it won't have a folder called Game but some dist or GS. Here we need to unpack it and rename it to Game, so that we get the folder with_server/Game/config or folder with_server/Game/log or folder with_server/Game/data structure that we put after unpacking datapack). Let's say we unpacked all that to C:\server. This gives us the structure (compare and see what's wrong and change it)

C:\server/login/config C:\server\game\config

Somewhere in the datapack will be additional folders like SQL or Tools - this is the installer of the initial database in the program, which we installed above (Mysql), but about them later. There can also be different folders like options. Everything must be in C:\server.

The structure is different for each server. Just do your research and don't get upset if you don't have it or have it but with a different name. Personally, I still have the following folders:

C:\server\sql C:\server\option C:\server\tools C:\server/doc.

Okay. We have unpacked our own future server. Now I will tell you how to set it up properly. But first, we need to create the required tables in our database to record accounts, characters, and other stuff. To do this, we first need to create a database for the server itself for future tables like accounts in mysql. We need a sql manager. I recommend using Navicat. Download here: http://www.navicat.com/en/download/download.html . You need Navicat for MySQL (you can use Lite).

Install Navicat. We go in. Click on the new connection. Enter our standard address where mysql is installed - 127.0.0.1, login - root and password - either blank, or root, or the one you specified if you set yourself mysql, you can test. The rest do not touch, all normal. Save. Click on the resulting connection in the window and voila, open incomprehensible sub-folders are standard databases. we need to create their own, for their own server l2. Right-click on the connection and click on New Database. Enter the name of our base. It does not matter what you call it. This is a service name for your server. I will call it l2server and I suggest you do the same.

So, the base for our own server has been created. Now we need to pour all the tables (accounts, characters...) into our newly created database. To do this we need to find an interesting file in the root of the server. It should lie in a folder named tools, or even without a folder. It should be called something like database_installer.bat. Open it with notepad and find somewhere in the beginning of the line to connect to our database. Here we must choose in what base we need to fill in the tables for the login server and the game server. Then we will look for something similar and configure it the same way:

set gsuser=root //user of our database to load the game server. Or you can give it another name. set gspass= //password for our game server database. Or another name. set gsname=l2server //backup our game server database set gshost=localhost //connection address. localhost=127.0.0.1 is the address of the computer. Can be written in different ways.

//and the same for the login server set lsuser=root set lspass= set lsname=l2server set lshost=localhost

When all the entries are made, close notepad, save the changes and double-click on the same file (in my case database_installer.bat)

A console window will appear. This can already be written anything, it all depends on the assembly, which you downloaded. I use emurt - paid build, so I can not lay out. The point is that from this command is to install the base Authentication (Login Server) and Game Base (Game Server). Install will be in the base, which we had previously created and through notepad pointed to her path. There will need a couple of keystrokes, where you will be asked to press the numbers corresponding to the menu item you have to choose. I have it like this:

I press install database/ install login server Log falls out with the fact that tamblitsy fill. (If errors, it means you do something wrong)

Then install game server, press install database / install game server

Congratulations, the data was successfully filled. You have created your database, which can be viewed and edited through Navicat (try to go back into it, select our base, and see the filled tables, you can edit everything there, such as level character)

Next, to create your own l2 server, I will tell you how to direct your login server and game server to your database, so that the server could record, delete or change information about players, accounts, items, and so on and so forth.

First, we set up the login server. Once again, I remind you that the paths may be different, as well as the name of the settings themselves, you just need to think logically. To do this, go to C:\server\login\config (or whatever) and look for a file like loginserver.properties or netw
