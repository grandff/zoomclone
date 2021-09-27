// message가 보여질 ul
const messageList = document.querySelector("ul");
// message를 보낼 form
const messageForm = document.querySelector("#message");
// nickname을 보낼 form
const nickForm = document.querySelector("#nick")
// backend와 socket 연결
const socket = new WebSocket(`wss://${window.location.host}`);

function handleOpen() {
	console.log("Connected to Server");
}

// backend에서 소켓이 열려서 통신이 가능할때 확인
socket.addEventListener("open", handleOpen);

// message 이벤트 추가
// message를 받으면 ul에 li가 생겨서 내역을 볼 수 있도록 처리
socket.addEventListener("message", (message) => {
	const li = document.createElement("li");
	li.innerText = message.data;
	messageList.append(li);
});

// 서버와 통신이 닫혔을 경우
socket.addEventListener("close", () => {
	console.log("Disconnected from Server");
});

// message를 json형태로 변환해서 리턴
function makeMessage(type, payload){
	const msg = {type, payload};
	return JSON.stringify(msg);		// 백엔드마다 다른 언어를 사용하므로 json object가 아닌 string 형태로 리턴해줘야함
}

// submit functions
function handleSubmit(event){
	event.preventDefault();
	const input = messageForm.querySelector("input");	// message 입력창
	socket.send(makeMessage("new_message", input.value));		// messabe를 server로 전달
	input.value = "";
}

// nick form submit function
function handleNickSubmit(event){
	event.preventDefault();
	const input = nickForm.querySelector("input");	// nickname 입력창
	socket.send(makeMessage("nickname", input.value));
	input.value = "";
}

// message form add submit events
messageForm.addEventListener("submit", handleSubmit);
// nick form add submit events
nickForm.addEventListener("submit", handleNickSubmit);