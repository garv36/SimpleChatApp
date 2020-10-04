const socket = io('http://localhost:5000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name  = prompt('WHat is your name');
appendMessage(' You Joined');
socket.emit('new-user' , name );

socket.on('chat-message', data => {
    console.log('Gaurav:::chat message',data);
    appendMessage(`${data.name} : ${data.message}`,'chat-message');
});

socket.on('user-connected', name => {
    console.log('Gaurav:::chat message',name);
    appendMessage(`${name} Connected`,'user-connected');
});

socket.on('user-disconnected', name => {
    console.log('Gaurav:::chat disconnected',name);
    appendMessage(`${name} Disconnected`,'user-disconnected');
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You : ${message}`,'message-send');
    socket.emit('send-chat-message',message);
    messageInput.value = '';
});

function appendMessage (message,event) {
    const messageElement = document.createElement('div');
    messageElement.setAttribute("class", event);
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

