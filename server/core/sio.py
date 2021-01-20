
from flask import request
from flask_socketio import SocketIO, emit
from . import openpose

sio = SocketIO()

@sio.event
def connect():
    print(request.args)

@sio.event
def process_image(data):
    image_uri =  data['image_uri']
    stage = data['stage']
    resultImg = openpose.getScore(image_uri, stage)
    if resultImg:
        emit('process_image_response', {'pass': True, 'image': resultImg.decode()})
    else:
        emit('process_image_response', {'pass': False, 'image': ""})