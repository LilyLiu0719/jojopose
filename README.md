# jojopose
2020 wed-programming final project

## openpose
1. Open openpose docker container
```
nvidia-docker run -itd -p 8787:80 openpose:test bash
docker exec -it <containerID> bash
```
2. Run test
```
cd /jojopose/openpose/
python3 main.py <img_path>
```

### Output Format
numpy array with shape (n, m, 3)
- n: number of people
- m: number of keypoints(<=25) 
- 3: x, y axis and score(0-1)
![ ](./images/keypoints_pose_25.png)
