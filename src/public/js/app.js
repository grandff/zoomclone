// backend와 socket 연결
const socket = new WebSocket(`ws://${window.location.host}`);

// backend에서 소켓이 열려서 통신이 가능할때 확인
socket.addEventListener("open", () => {
	console.log("Connected to Server");
});

// message 이벤트 추가
socket.addEventListener("message", (message) => {
	console.log("New Message : " , message.data);
});

// 서버와 통신이 닫혔을 경우
socket.addEventListener("close", () => {
	console.log("Disconnected from Server");
});

// 서버에 메시지 전달
setTimeout(() => {
	socket.send("hello from the browser");
}, 5000);