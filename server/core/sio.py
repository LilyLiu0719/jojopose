
from flask import request
from flask_socketio import SocketIO, emit
from . import openpose

sio = SocketIO()

@sio.event
def connect():
    print(request.args)

@sio.event
def process_image(image_uri):
    emit('process_image_response', openpose.process(image_uri).decode())