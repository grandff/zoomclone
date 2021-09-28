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
}

// form submit function
function handleRoomSubmit(event){
	event.preventDefault();
	const input = form.querySelector("input");
	socket.emit("enter_room", input.value, showRoom);
	roomName = input.value;
	input.value = "";
}

// add form submit event
form.addEventListener("submit", handleRoomSubmit);