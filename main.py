from flask import Flask, render_template, request
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app)


@socketio.on('message')
def mirror_messages(message):
    print('Message: ' + message)
    send(message, broadcast=True)


@app.route('/room')
def chat_room():
    room_number = request.args.get('room')
    return render_template('index.html', room=room_number)


@app.route('/')
def rooms():
    return render_template('rooms.html')


if __name__ == '__main__':
    socketio.run(app)
