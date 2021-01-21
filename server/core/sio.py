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
    mask, background, answer = mongodb.fetchImageWithCache(
        data["stage_id"], data["image_id"]
    )
    #openpose.printImg(mask)
    resultImg, score = openpose.getScore(capture, mask, background, answer)
    if resultImg:
        emit(
            "process_image_response",
            {"pass": True, "image": resultImg.decode(), "score": score},
        )
    else:
        emit("process_image_response", {"pass": False, "image": "", "score": score})
