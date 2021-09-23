## Zoom Clone Coding

# Setup
1) package 설정
	- npm init -y
2) 설정용 파일들 추가
	- touch README.MD
	- touch babel.config.json
	- touch nodemon.json
	- touch .gitignore(node_module 추가해놓기)
3) install
	- npm install nodemon -D
	- npm install @babel/core @babel/cli @babel/node @babel/preset-env -D	
	- npm install pug
	- npm install express
4) git 설정
	- git init
5) server 파일 추가
	- src/server.js
6) json 파일 정리
	[nodemon.js]
	{
		"ignore" : ["src/public/*"],
		"exec" : "babel-node src/server.js"
	}
	
	[babel.config.json]
	{
		"presets" : ["@babel/preset-env"]
	}
	
	[package.json]
	scripts : {
		"dev" : "nodemon"
	}
7) main page 생성(home.pug)
8) server 세팅
	[server.js]
	import express from "express";

	const app = express();
	app.set("view engine", "pug");
	app.set("views", __dirname + "/views");
	app.use("/public", express.static(__dirname + "/public"));

	app.get("/", (req,res) => res.render("home"));	// home pug로 렌더 처리
	app.get("/*", (req,res) => res.redirect("/"));	// 다른 url 안쓰고 홈만 쓰도록 처리

	const handleListen = () => console.log(`Localhost on 3000`);
	app.listen(3000, handleListen);