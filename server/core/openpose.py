from os.path import dirname, join
import base64
import cv2
import numpy as np
import pyopenpose as op

class PoseDetector:
    def __init__(self, model_path="./models/"):
        # load models 
        params = dict()
        params["model_folder"] = model_path
        print("[*] success loading model from", model_path)

        # Starting OpenPose
        self.opWrapper = op.WrapperPython()
        self.opWrapper.configure(params)
        self.opWrapper.start()
        print("[*] openpose start!")

    def processImage(self, imageToProcess):
        datum = op.Datum()
        datum.cvInputData = imageToProcess
        self.opWrapper.emplaceAndPop([datum])
        return datum.poseKeypoints, datum.cvOutputData


modelPath = join(dirname(__file__), '..', '..', 'openpose', 'models')
pd = PoseDetector(model_path=modelPath)

def to_cv2_img(data_uri):
    encoded_data = data_uri.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def process(data_uri):
    keypoint, img = pd.processImage(to_cv2_img(data_uri))
    ret, buffer = cv2.imencode('.png', img)
    return b'data:image/png;base64,' + base64.b64encode(buffer)