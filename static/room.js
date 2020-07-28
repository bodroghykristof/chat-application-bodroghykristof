const socket = io.connect('http://127.0.0.1:5000/');
socket.addEventListener('connect', logConnectionOnServer);
socket.addEventListener('message', addMessageToChatBoard);


function logConnectionOnServer() {
    socket.send('User has connected')
}

function addMessageToChatBoard(message) {
    const chatBoard = document.querySelector('.messages-board');
    let newMessage = document.createElement('p');
    newMessage.innerHTML = message;
    chatBoard.appendChild(newMessage);
}


const roomLinks = [...document.querySelectorAll('.room-link')];
roomLinks.forEach(link => link.addEventListener('click', function () {
    let roomNumber = this.dataset.room;
    socket.emit('join', roomNumber);
    const chatBoard = document.querySelector('.messages-board');
    let newBoard = document.createElement('div');
    newBoard.classList.add('board');
    newBoard.innerHTML =
        `
        <h3>Room ${roomNumber}</h3>
        <label for="message">Enter your message!</label><br>
        <input type="text" id="input-${roomNumber}"><br>
        <button classs="send-button" id="send-${roomNumber}">Send</button>
        <div class="chat-board">
            <h3>Messages</h3>
        </div>
    `
    chatBoard.appendChild(newBoard);
    addNewListeners(roomNumber);
}));


function addNewListeners(roomNumber) {
    const newButton = document.querySelector(`#send-${roomNumber}`);
    newButton.addEventListener('click', sendMessageToServer);

    const newInputField = document.querySelector(`#input-${roomNumber}`);
    newInputField.addEventListener('input', displayTyping);
}


function sendMessageToServer() {
    let roomNumber = this.id.split('-')[1];
    let correspondingInputField = document.querySelector(`#input-${roomNumber}`);
    let newMessage = JSON.stringify({message: correspondingInputField.value, room: roomNumber});
    correspondingInputField.value =  '';
    socket.emit('get_message', newMessage);
    correspondingInputField.addEventListener('input', displayTyping);
}


function displayTyping() {
    socket.send('User is typing...');
    this.removeEventListener('input', displayTyping);
}