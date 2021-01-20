from os import environ, mkdir
from os.path import exists, dirname, join
from mongoengine import connect

connect("jojo", host=environ["MONGO_URL"])

from . import models
from . import openpose
import cv2

server_root = join(dirname(__file__), "..")
image_dir = join(server_root, "images")


def fetchImage(imageID):
    return models.Image.objects(id=imageID).first()


def fetchImageWithCache(stageID, imageID):
    cache_path = join(image_dir, stageID, imageID)
    if exists(cache_path):
        background = cv2.imread(join(cache_path, "background.png"))
        mask = cv2.imread(join(cache_path, "mask.png"), cv2.IMREAD_UNCHANGED)
    else:
        image = fetchImage(imageID, cv2.IMREAD_UNCHANGED)
        background = openpose.to_cv2_img(image.background)
        mask = openpose.to_cv2_img(
            image.mask, cv2.IMREAD_UNCHANGED
        )  # preserve alpha channel
        cv2.imwrite(join(cache_path, "background.png"), background)
        cv2.imwrite(join(cache_path, "mask.png"), mask)
    return mask, background
