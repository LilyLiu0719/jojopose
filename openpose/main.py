import sys
from detect_pose import PoseDetector
import cv2
import os

img_exts = ['.png', '.jpg', '.jpeg', '.HEIC']

if __name__=='__main__':
    poseDetector = PoseDetector()
    path = sys.argv[1]
    if os.path.isdir(path):
        for f in os.listdir(path):
            name, ext = os.path.splitext(f)
            if ext not in img_exts:
                continue
            print(f"processing image {os.path.join(path, f)}")
            img = cv2.imread(os.path.join(path, f))
            keypoints, result_img = poseDetector.processImage(img)
            cv2.imwrite(f"/home/lily/jojopose/openpose/results/result_{name}.png", result_img)
    elif os.path.isfile(path):
        name, ext = os.path.splitext(path)
        name = name.split()[-1]
        if ext not in img_exts:
            print("[!] ERROR", path, "is not a proper image")
        else:    
            img = cv2.imread(path)
            keypoints, result_img = poseDetector.processImage(img)
            cv2.imwrite(f"results/result_{name}.png", result_img)
    else:
        print("[!] ERROR", path, "not exist")
