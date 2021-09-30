const socket = io();		// socket io에서 제공하는 io 생성

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName;		// 채팅방 이름

// 채팅방에 접속했을때 메시지 입력 창을 보여주는 콜백함수
function showRoom(){
	welcome.hidden = true;
	room.hidden = false;
	const h3 = room.querySelector("h3");
	h3.innerText = `Room ${roomName}`;	
	const form = room.querySelector("form");
	form.addEventListener("submit", handleMessageSubmit);
}

// send message submit function
function handleMessageSubmit(event){
	event.preventDefault();
	const input = room.querySelector("input");
	const value = input.value;	// call back 함수 버그 고치기용
	// 어느 방에서 보내는지 구분하기 위해 방이름도 같이 보냄
	socket.emit("new_message", input.value, roomName, () => {
		addMessage(`You : ${value}`); 
	});
	input.value = ""; // call back 함수에서 만약 값이 비어있으면 빈값을 front end로 보내버림. 따라서 별도로 value 값을 저장
}

// room enter submit function
function handleRoomSubmit(event){
	event.preventDefault();
	const input = form.querySelector("input");
	socket.emit("enter_room", input.value, showRoom);
	roomName = input.value;
	input.value = "";
}

// 메시지 전송
function addMessage(message){
	const ul = room.querySelector("ul");
	const li = document.createElement("li");
	li.innerText = message;
	ul.appendChild(li);
}

// welcome event listener
socket.on("welcome", () => {
	addMessage("someone joined!");
});

// bye event listener
socket.on("bye", () => {
	addMessage("someone left :(");
});

// new_message event listener
socket.on("new_message", addMessage);

// add form submit event
form.addEventListener("submit", handleRoomSubmit);