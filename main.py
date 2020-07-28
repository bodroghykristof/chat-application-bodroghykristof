from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, join_room
import json

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


@socketio.on('get_message')
def mirror_messages(data):
    data_object = json.loads(data)
    send(data, broadcast=True, room=data_object['room'])


@socketio.on('message')
def log_message(message):
    print(message)


if __name__ == '__main__':
    socketio.run(app)
