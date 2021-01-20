from flask import request
from flask_socketio import SocketIO, emit
from . import openpose
from . import mongodb

sio = SocketIO()


@sio.event
def connect():
    print(request.args)


@sio.event
def process_image(data):
    image_uri = data["image_uri"]
    capture = openpose.to_cv2_img(image_uri)
    mask, background = mongodb.fetchImageWithCache(data["stage_id"], data["image_id"])
    resultImg = openpose.getScore(capture, mask, background)
    if resultImg:
        emit("process_image_response", {"pass": True, "image": resultImg.decode()})
    else:
        emit("process_image_response", {"pass": False, "image": ""})
