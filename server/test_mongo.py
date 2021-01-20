from dotenv import load_dotenv

load_dotenv()

from core import mongodb

# This file is used to test mongoengine
models = mongodb.models

with open('temp', 'r') as f:
    stage = models.Stage.objects(difficulty=5).first()
    ret = stage.update(set__thumbnail=f.read())
    print(ret)