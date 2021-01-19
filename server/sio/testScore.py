import openpose
import cv2
import numpy as np
import sys

pose = cv2.imread(sys.argv[1])
truth = cv2.imread(sys.argv[2], cv2.IMREAD_UNCHANGED)
pose = cv2.resize(pose, (truth.shape[1], truth.shape[0]), interpolation=cv2.INTER_LINEAR)
score = openpose.getScore(pose, truth)
