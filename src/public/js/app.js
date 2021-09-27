// message가 보여질 ul
const messageList = document.querySelector("ul");
// message를 보낼 form
const messageForm = document.querySelector("form");
// backend와 socket 연결
const socket = new WebSocket(`wss://${window.location.host}`);

function handleOpen() {
	console.log("Connected to Server");
}

// backend에서 소켓이 열려서 통신이 가능할때 확인
socket.addEventListener("open", handleOpen);

// message 이벤트 추가
socket.addEventListener("message", (message) => {
	console.log("New Message : " , message.data);
});

// 서버와 통신이 닫혔을 경우
socket.addEventListener("close", () => {
	console.log("Disconnected from Server");
});

// submit functions
function handleSubmit(event){
	event.preventDefault();
	const input = messageForm.querySelector("input");	// message 입력창
	socket.send(input.value);		// messabe를 server로 전달
	input.value = "";
}

// message form add submit events
messageForm.addEventListener("submit", handleSubmit);