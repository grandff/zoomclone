import express from "express";
import http from "http";
import WebSocket from "ws";
import SocketIo from "socket.io";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
 
app.get("/", (req,res) => res.render("home"));	// home pug로 렌더 처리
app.get("/*", (req,res) => res.redirect("/"));	// 다른 url 안쓰고 홈만 쓰도록 처리

const handleListen = () => console.log(`Server on 3000`);

const httpServer = http.createServer(app);		// express application으로부터 서버 생성
const wsServer = SocketIo(httpServer);	// socket io server 생성

// 전체 방을 알려주는 함수
function publicRooms(){
	const {sockets : {adapter : {sids, rooms}}} = wsServer;
	const publicRooms = [];
	rooms.forEach((_, key) => {
		console.log(key, sids.get(key));
		if(sids.get(key) === undefined){
			publicRooms.push(key);
		}
	});

	return publicRooms
}

// 해당 채팅방 안의 사용자 수 세기
function countRoom(roomName){
	return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", socket => {
	// catch listener
	socket.onAny((event) => {
		console.log(event);
	});
	
	// 채팅방 접속 이벤트
	socket.on("enter_room", (roomName, nickname, done) => {		
		socket["nickname"] = nickname;	// 닉네임 설정
		socket.join(roomName);		// 해당 채팅방 접속
		socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));	// welcome 이벤트 발생
		wsServer.sockets.emit("room_change", publicRooms());	// 전체 채팅 방 수 리턴
		done(countRoom(roomName));						// 콜백함수 실행
	});

	// 채팅방 종료 이벤트
	socket.on("disconnect", () => {
		wsServer.sockets.emit("room_change", publicRooms());
	})
	
	// 사용자가 나간 경우 알림 처리
	socket.on("disconnecting", () => {
		// socket rooms가 array 형태기 때문에 리턴되는 배열을 하나씩 조회
		socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1));
	});
	
	// 메시지 보내는 이벤트 처리
	socket.on("new_message", (msg, room, done) => {
		socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
		done();
	});	
})

httpServer.listen(3000, handleListen);
/*
const wss = new WebSocket.Server({server});	// 여기선 동일 포트에서 http, ws 둘다 처리하기 위해 해놨음. 굳이 이렇게 안에 server를 안올려도 됨
const sockets = [];	// 서버에 연결한 소켓 정보를 저장할 임시 저장소


// socket이 닫혔을때 호출
function onSocketClose() {
	console.log("Disconnected to Browser");
}

// socket을 통해 메시지 전달
function onSocketMessage(message){
	//console.log(message.toString("UTF8")); // terminal 에서 깨질 경우 조치	
}

// utf8 변환
const changeUTF8 = (str) => str.toString("UTF8");

// wss 에서 콜백으로 주는 것들 중에 socket은 통신을 하기 위해 필요하므로 별도로 저장
wss.on("connection", (socket) => {	
	console.log("Connected to Browser");
	sockets.push(socket);	// 연결한 소켓 저장
	socket["nickname"] = "Anon";	// 닉네임을 안정하고 보낼수도 있으므로 초기 닉네임 설정
	socket.on("close", onSocketClose);	// 브라우저가 닫히면 이벤트 발생
	socket.on("message", (msg) => {
		const message = JSON.parse(msg);
		
		switch(message.type){		// type으로 데이터 형태 구분
			case "new_message" : 
				sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${changeUTF8(message.payload)}`));
				
			case "nickname" : 
				socket["nickname"] = message.payload;
		}
		
	});	// 브라우저에서 받은 메시지
	
});		// web sockect 연결
*/
