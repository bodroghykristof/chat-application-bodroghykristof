const socket = io.connect('http://127.0.0.1:5000/');

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
        <input type="text" id="message-${roomNumber}"><br>
        <button classs="send-button" id="send-${roomNumber}">Send</button>
        <div class="chat-board">
            <h3>Messages</h3>
        </div>
    `
    chatBoard.appendChild(newBoard)
}));