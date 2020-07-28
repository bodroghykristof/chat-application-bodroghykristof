// Basic socket events

const socket = io.connect('http://127.0.0.1:5000/');
socket.addEventListener('connect', logConnectionOnServer);
socket.addEventListener('message', addMessageToChatBoard);

function logConnectionOnServer() {
    socket.send('User has connected')
}

function addMessageToChatBoard(message) {
    const chatBoard = document.querySelector('.chat-board');
    let newMessage = document.createElement('p');
    newMessage.innerHTML = message;
    chatBoard.appendChild(newMessage);
}

// Events for pressing button

const sendButton = document.querySelector('#send-button');

sendButton.addEventListener('click', sendMessageToServer);

function sendMessageToServer() {
    let newMessage = document.querySelector('#message').value;
    document.querySelector('#message').value =  '';
    socket.send(newMessage);
}

// Events for typing

const inputField = document.querySelector('#message');

inputField.addEventListener('input', displayTyping);

function displayTyping() {
    alert('Hey');
}