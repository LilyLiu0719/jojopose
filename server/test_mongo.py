from dotenv import load_dotenv

load_dotenv()

from core import mongodb

# This file is used to test mongoengine
models = mongodb.models


from os import listdir
from os.path import join, dirname

root = join(dirname(__file__), "..", "..", "drive-download-20210120T135410Z-001")
for stageID in listdir(root):
    subdir = join(root, stageID)
    for imgID in listdir(subdir):
        with open(join(subdir, imgID, "answer"), "r") as f:
            ans = f.read()
        print(models.Image.objects(id=imgID).update(set__answer=ans))