const socket = io();		// socket io에서 제공하는 io 생성

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

// form submit function
function handleRoomSubmit(event){
	event.preventDefault();
	const input = form.querySelector("input");
	socket.emit("enter_room", {payload : input.value}, () => {
		console.log("server is done");
	});
	input.value = "";
}

// add form submit event
form.addEventListener("submit", handleRoomSubmit);