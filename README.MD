# Zoom Clone Coding

## Setup
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
	
## Chat with WebSockets
### WebSockets In NodeJs
1) ws 설치
	- web socket의 기본적인 것들이 다 들어가있는 라이브러리임
	- npm install ws
2) express 서버와 ws 소켓 연결
	- http와 ws를 동시에 사용하기 위해 server.js 쪽 수정 
### WebSocket Events
1) backend와 frontend 연결
	- ws를 활용해서 연결함
### WebSocket Messages
1) backend와 frontend 간 통신
	- 서로 메시지를 보내면서 통신 테스트
### Chat Completed
1) message를 보낼 수 있는 form 생성
	- home.pug에 form, input, button 생성
	- app.js 에 event listener 추가
2) message를 받고 서버에서 확인
	- 받은 메시지를 확인하기 위해 메시지 받으면 브라우저단으로 해당 메시지를 다시 리턴해줌
	- 어느 브라우저에서 받았는지 확인하기 위해 임시데이터베이스 생성(배열 안에 소켓정보 그냥 넣어줌)
### Nicknames
1) message를 받으면 ul에 표시되도록 설정
2) 닉네임을 입력할 수 있는 form 생성
	- 닉네임과 message를 구분할 수 있도록 json 형태로 리턴
	- type을 통해 form 구분