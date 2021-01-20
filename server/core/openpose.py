from os.path import dirname, join
import base64
import cv2
import numpy as np
import os

class PoseDetector:
    def __init__(self, model_path="./models/", test=False):
        self.test = test
        if test:
            print("[!] WARNING: in testing mode")
            testKeyPoints = np.arange(75).reshape(1, 25, 3)
            for i in range(25):
                testKeyPoints[0][i][2] = 1.0
            self.testKeyPoints = testKeyPoints
        else:
            # load models 
            params = dict()
            params["model_folder"] = model_path
            print("[*] success loading model from", model_path)

            # Starting OpenPose
            import pyopenpose as op
            self.opWrapper = op.WrapperPython()
            self.opWrapper.configure(params)
            self.opWrapper.start()
        
        print("[*] openpose start!")

    def processImage(self, imageToProcess):
        if self.test:
            return self.testKeyPoints, imageToProcess
        else:
            datum = op.Datum()
            datum.cvInputData = imageToProcess
            self.opWrapper.emplaceAndPop([datum])
            return datum.poseKeypoints, datum.cvOutputData

modelPath = join(dirname(__file__), '..', '..', 'openpose', 'models')
pd = PoseDetector(model_path=modelPath, test=True)

def to_cv2_img(data_uri):
    encoded_data = data_uri.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def process(data_uri):
    keypoint, img = pd.processImage(to_cv2_img(data_uri))
    ret, buffer = cv2.imencode('.png', img)
    return b'data:image/png;base64,' + base64.b64encode(buffer)

def getScore(data_uri, stage, vis=False):
    imageToProcess = to_cv2_img(data_uri)
    filename, ext = os.path.splitext(stage)
    mask = cv2.imread('images/mask'+ filename + '.png', cv2.IMREAD_UNCHANGED)
    mask = cv2.resize(mask, (imageToProcess.shape[1], imageToProcess.shape[0]), interpolation=cv2.INTER_LINEAR)
    background = cv2.imread('images/'+ filename + '.png')
    background = cv2.resize(background, (imageToProcess.shape[1], imageToProcess.shape[0]), interpolation=cv2.INTER_LINEAR)
    # answer = [True]*25

    if not imageToProcess.shape[:2] == mask.shape[:2]:
        print(f"[!] ERROR: image shape must match to mask! {imageToProcess.shape} != {mask.shape}")
        return -1, []
    if mask.shape[2]==4:
        mask = mask[:, :, 3]
    
    keyPoints, _ = pd.processImage(imageToProcess)
    match = [False]*25
    for keyPoint in keyPoints:
        for i, point in enumerate(keyPoint):
            if point[2]>0:
                if mask[int(point[1]), int(point[0])]==0:
                    match[i]=True
    #if match==answer:
    if True:
        merge = background.copy()
        merge[mask>0] = imageToProcess[mask>0]
        ret, buffer = cv2.imencode('.png', merge)
        return b'data:image/png;base64,' + base64.b64encode(buffer)
    else:
        return ""
