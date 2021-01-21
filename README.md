# jojopose

**[109-1] Web Programming Final**

**(Group 12) JOJO Pose**

- Deployed 連結: [https://jojo-pose.live/](https://jojo-pose.live/) (因為跑在GCP的GPU上，平時不一定會開)
- Demo 影片連結
- 描述這個服務在做什麼:

    這是一個影像互動式網頁遊戲，遊戲中玩家依照關卡需求擺出指定動作，由電腦的前鏡頭拍攝照片傳到後端，後端會自動辨識出玩家現在的姿勢，姿勢與題目相似度高於通關門檻便可通關。

    另外也提供玩家創造新關卡的服務：玩家可以上傳自己喜歡的圖片，並標記人物所在位置的外框及所屬身體部位，便可進行遊玩。

- 使用/操作方式 (含伺服器端以及使用者端)

    **使用者端：**

    進入網站後，輸入使用者帳密登入(新使用者第一次登入會建立資料)，便可進到遊戲選單畫面

    - START GAME: 開始遊戲：選擇關卡→遊戲規則說明→正式遊戲(需開啟相機權限)→如果有在時間內成功擺出指定姿勢，即為過關成功，進入下一關；若一直沒有成功，時間到便視為過關失敗。
    - GALLERY: 展示使用者通關後的照片，會與該關之JOJO原圖背景做結合
    - UPLOAD: 使用者可以上傳自己喜歡的圖，並使用鋼筆工具標出人物外框及所屬身體部位，儲存後便可遊玩該新關卡。
    - SETTING: 設定，可調節背景音樂的音量。
    - LOGOUT: 登出。

    **伺服器端：**

    1. 準備 openpose model 及其環境
    2. 準備 python 環境 (python 3.6.9+)

        ```bash
        pip install -r requirements.txt
        ```

    3. 產生前端 production build

        ```bash
        cd frontend
        yarn build
        ```

    4. 環境設定
        - .env.defaults 同資料夾下放包含 MONGO_URL 的 .env
        - 準備 certfile 和 keyfile
    5. 執行 server

        ```bash
        gunicorn --worker-class eventlet -w 1 --certfile=./secret/cert1.pem --keyfile=./secret/privkey1.pem -b 0.0.0.0:443 main:app
        ```

- Github link: [https://github.com/LilyLiu0719/jojopose](https://github.com/LilyLiu0719/jojopose)
- 使用與參考之框架/模組/原始碼
    - 框架
        - Frontend:
            - React
            - GraphQL
            - SocketIO
        - Backend (Python)
            - Flask
            - Openpose ([https://github.com/CMU-Perceptual-Computing-Lab/openpose](https://github.com/CMU-Perceptual-Computing-Lab/openpose))
        - DB:
            - mongoDB
    - Packages
        - Frontend:
            - antd
            - react-webcam
            - Canvas: konva
            - SocketIO: socket.io-client
            - GraphQL: apollo, graphql
        - Backend:
            - Flask: Flask-SocketIO, Flask-GraphQL
            - MongoDB: mongoengine (pymongo)
            - GraphQL: graphene (graphene-mongo)
            - OpenCV
            - bcrypt
## 專題製作心得
    - 劉穎立:

        難得遇到全組都是JO粉，當然要做JOJO相關的遊戲！常常看到網友在模仿JOJO中的人物站姿，但其實沒有一個客觀的方法來評斷這些人到底擺得像不像，這次我們便是實作了一個由Pose偵測，來檢查大家究竟夠不夠JO。雖然很多當初設想的功能都來不及實作，但邊寫扣邊擺姿勢測試蠻好玩的，但這個遊戲真的難，玩到最後會腰痠背痛。

    - 施力維:

        這個題目最難的不是寫扣，而是找到全組JOJO粉的組員們！雖然JOJO立很常見，但是實際做這個遊戲的過程中才發現其實很多姿勢要模仿到動畫實際的比例都超難，不時還要拿各種輔助工具。一步步串起前後端，寫好一整個遊戲真的頗有成就感。

    - 李子筠:

        在這個專案中我們一步一步在 GCP 上面架了一個 https server，過程中遇到的最大問題是 GPU 太燒錢，GCP 的額度不太夠用。和其他JOJO粉一起完成JOJO遊戲也很有趣，在筆電前面對著鏡頭擺出各種姿勢，花好幾分鐘試圖把自己塞在框框裡的過程也充滿樂趣。


## Contributions
    - B06901145 李子筠: Backend/Frontend (MongoDB, GraphGL, SocketIO)
    - B04502031 施力維: Frontend (Game, Labeling)
    - B06901004 劉穎立: Backend (Openpose), Frontend(UI)


<!-- ## Development

### Running testing server

```sh
cd frontend
yarn build # create production build of frontend
cd server
python main.py
```

## Deploy

```sh
cd frontend
yarn build # create production build of frontend
cd server
gunicorn --worker-class eventlet -w 1 -b 0.0.0.0:80 main:app # start gunicorn server on 0.0.0.0:80
gunicorn --worker-class eventlet -w 1 --certfile=./secret/cert1.pem --keyfile=./secret/privkey1.pem -b 0.0.0.0:443 main:app # start gunicorn server on 0.0.0.0:443
```

### Deploy setup

```
sudo nvidia-docker run -p 80:80 -itd openpose:test bash

sudo docker cp ./build [container]:/jojopose/frontend/build

apt-get -o Dpkg::Options::="--force-confmiss" install --reinstall netbase

cd /jojopose
git checkout HEAD -- openpose/main.py
git pull --rebase

python3 -m pip install -r requirements.txt
```

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
  ![ ](./images/keypoints_pose_25.png) -->
