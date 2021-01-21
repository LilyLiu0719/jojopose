from dotenv import load_dotenv

load_dotenv()

from core import mongodb

# This file is used to test mongoengine
models = mongodb.models


from os import listdir
from os.path import join, dirname

root = join(dirname(__file__), "..", "..", "drive-download-20210120T135410Z-001")
# for stageID in listdir(root):
#     subdir = join(root, stageID)
#     stage = models.Stage.objects(id=stageID).first()
#     print(stage.difficulty, stageID)
#     for imgID in listdir(subdir):
#         with open(join(subdir, imgID, "answer"), "r") as f:
#             ans = f.read()
#         print("  ", imgID, ans)
#         # print(models.Image.objects(id=imgID).update(set__answer=ans))


ids = {
    "1-1": "6007d8c3902b00b4d93c4419",
    "1-2": "6007d8e8902b00b4d93c441a",
    "2-1": "6007d9a6902b00b4d93c4420",
    "1-6": "6007d984902b00b4d93c441e",
    "1-7": "6007d996902b00b4d93c441f",
    "1-5": "6007d968902b00b4d93c441d",
    "2-2-2": "6007d9ea902b00b4d93c4422",
    "2-2-1": "6007d9d2902b00b4d93c4421",
    "2-4": "6007da11902b00b4d93c4423",
    "1-3": "6007d939902b00b4d93c441b",
    "1-4": "6007d94c902b00b4d93c441c",
    "2-5": "6007da23902b00b4d93c4424",
}

ans = {
    "1-1": "1110110000000001101000000",
    "1-2": "1110110100000001111000000",
    "1-3": "1111111111101100101000000",
    "1-4": "1111111111101101010000000",
    "1-5": "1111111111001001111000000",
    "1-6": "1111111111001001111000000",
    "1-7": "1111111111101101111000000",
    "2-1": "1111110100000000101000000",
    "2-2-1": "1111111111101000101000000",
    "2-4": "1111011011101000101000000",
    "2-5": "1111111111101101111000000",
}

for key, a in ans.items():
    image = models.Image.objects(id=ids[key]).update(set__answer=a)
    print(image)