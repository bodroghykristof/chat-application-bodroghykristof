from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, join_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app)


@app.route('/')
def rooms():
    return render_template('chat.html')


@socketio.on('join')
def join_chat_room(room):
    print(room)
    join_room(room)


@socketio.on('message')
def mirror_messages(message):
    print('Message: ' + message)
    send(message, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
