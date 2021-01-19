import sys
from detect_pose import PoseDetector
import cv2

if __name__=='__main__':
    poseDetector = PoseDetector()
    img = cv2.imread(sys.argv[1])
    keypoints = poseDetector.processImage(img)
    print(keypoints)
    print(keypoints.shape)
