const socket = io.connect('http://127.0.0.1:5000/');
const sendButton = document.querySelector('#send-button');

socket.addEventListener('connect', logConnectionOnServer);
socket.addEventListener('message', addMessageToChatBoard);

sendButton.addEventListener('click', sendMessageToServer);

function logConnectionOnServer() {
    socket.send('User has connected')
}

function addMessageToChatBoard(message) {
    const chatBoard = document.querySelector('.chat-board');
    let newMessage = document.createElement('p');
    newMessage.innerHTML = message;
    chatBoard.appendChild(newMessage);
}

function sendMessageToServer() {
    let newMessage = document.querySelector('#message').value;
    document.querySelector('#message').value =  '';
    socket.send(newMessage);
}
