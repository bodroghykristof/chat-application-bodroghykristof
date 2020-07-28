const socket = io.connect('http://127.0.0.1:5000/');
socket.addEventListener('connect', logConnectionOnServer)

function logConnectionOnServer() {
    socket.send('User has connected')
}