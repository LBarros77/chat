const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

// amit => to emit information
// on => executing information

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Hello ${username}, you it's in ${room}`;

socket.emit("select_room", {
	username,
	room,
}, (messages) => {
	messages.forEach((message) => createMessage(message));
});

document
	.getElementById("message_input")
	.addEventListener("keypress", (event) => {
		if(event.key === "Enter") {
			const message = event.target.value;
			const data = {
				room,
				message,
				username,
			};
			socket.emit("message", data);
			event.target.value = "";
		}
	});

socket.on("message", (data) => {
	createMessage(data);
});

function createMessage(data) {
	const messageDiv = document.getElementById("messages");
	messageDiv.innerHTML += `
	<div class="new_message">
		<label class="form-label">
			<strong> ${data.username} </strong> <p>${data.text}</p> 
			<span>${dayjs(data.createAt).format("DD/MM HH:mm")}</span>
		</label>
	</div>
	`;
}

document.getElementById("logout").addEventListener("click", (event) => {
	window.location.href = "index.html";
})