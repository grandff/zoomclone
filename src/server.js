import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
 
app.get("/", (req,res) => res.render("home"));	// home pug로 렌더 처리
app.get("/*", (req,res) => res.redirect("/"));	// 다른 url 안쓰고 홈만 쓰도록 처리

const handleListen = () => console.log(`Server on 3000`);

const server = http.createServer(app);		// express application으로부터 서버 생성
const wss = new WebSocket.Server({server});	// 여기선 동일 포트에서 http, ws 둘다 처리하기 위해 해놨음. 굳이 이렇게 안에 server를 안올려도 됨

// wss 에서 콜백으로 주는 것들 중에 socket은 통신을 하기 위해 필요하므로 별도로 저장
wss.on("connection", (socket) => {
	console.log("Connected to Browser");
	socket.on("close", () => console.log("Disconnected to Browser"));	// 브라우저가 닫히면 이벤트 발생
	socket.on("message", message => {
		console.log(message);
	});	// 브라우저에서 받은 메시지
	socket.send("hello!");
});		// web sockect 연결

server.listen(3000, handleListen);