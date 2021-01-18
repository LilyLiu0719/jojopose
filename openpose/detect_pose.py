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
