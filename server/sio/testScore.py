import openpose
import cv2
import numpy as np
import sys

pose = cv2.imread(sys.argv[1])
truth = cv2.imread(sys.argv[2], cv2.IMREAD_UNCHANGED)
background = cv2.imread(sys.argv[3])
pose = cv2.resize(pose, (truth.shape[1], truth.shape[0]), interpolation=cv2.INTER_LINEAR)
background = cv2.resize(background, (truth.shape[1], truth.shape[0]), interpolation=cv2.INTER_LINEAR)
match, merge = openpose.getScore(pose, truth, background, [True]*25, vis=True)
cv2.imwrite("../images/testMerge.png", merge)
