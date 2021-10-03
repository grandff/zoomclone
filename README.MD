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
3) 각 input value를 구분하기 위해 json 형태로 리턴
	- json object 형태가 아닌 string 형태로 변환해서 리턴(JSON.stringify)
	- 서버에서는 parse를 사용해서 json 데이터 확인
	- switch를 활용해 type별로 데이터 처리
	
	
## SocketIo
### Installing SocketIo
1) npm install socket.io
2) websocket으로 만든 부분 모두 주석처리하고 socketio로 수정처리
	- socket io에서 socket.io.js 라는 스크립트를 제공해주는데 브라우저보다 제공해주는 기능이 많기 때문에 별도로 선언해서 써야함
### Socket is Amazing
1) object를 통째로 주고받는 것만 가능한 websocket과는 달리 데이터 유형을 선언해서 줄 수 있음
2) send가 아닌 emit를 통해 사용
	- 마지막 매개변수에 function을 주면 call back 함수로 사용 가능함
### Rooms
1) socket에서 기본적으로 제공해주는 room 기능 활용
	- onAny를 통해 어디서든 catch listener 사용 가능
2) 채팅방에 접속했을 때 사용하는 메시지보내는 창 추가
### Room Messages
1) 채팅방에 접속한 경우 해당 room에 있는 전체한테 welcome 이벤트 발생
2) 프론트에서는 서버에서 발생시킨 welcome 이벤트 리스너 등록
### Room Notifications
1) 유저가 방에 떠났을 경우 알려주는 처리
	- disconnecting event 활용
	- 서버랑 완전히 끊어진게 아닌 사용자가 일시적으로 접속을 중단할때 호출됨
2) 메세지 전송 리스너 추가
### Nicknames
1) nickname 설정을 방 입장 단계에서 부터 해주기
	- nickname, room name 필수 체크 후 소켓 연결
	- 해당 유저의 메시지 보내기, 방 나가기 등 모든 이벤트에 닉네임 붙여서 알려주기
### Room Count
1) Adaptar 에 대해 사용해야함
	- 좀 어려우므로 강의 다시 보기 ...
2) server에서 전체 방을 리턴해주는 함수 생성
	- sockets의 adapter 안에 있는 sids와 rooms 사용
3) 새로운 방이 만들어지면 모든 사용자에게 목록 리턴
	- 서버에 있는 모두에게 보내야하므로 server sockets emit 사용