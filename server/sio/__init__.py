
from flask import request
from flask_socketio import SocketIO

sio = SocketIO()

@sio.event
def connect():
    print(request.args)


@sio.on('get_hello')
def hello(*args, **kwargs):
    print('got message from socket', args, kwargs)