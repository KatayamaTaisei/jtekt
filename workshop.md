# Workshop

## Step 1: Clone Repository

GitHubからレポジトリをダウンロードします．VSCodeのターミナルで次のコマンドを実行してください．
```bash
git clone {this_repository_url}
```

次にレポジトリがダウンロードされていることを確認して，プロジェクトフォルダをVSCodeで開きます．ターミナルで次のコマンドを実行してください．
```bash
ls # show contents in the current folder
code {project_folder}
```

## Step 2: Node.js Setup
あたらしいVSCodeのウィンドウのターミナルで必要なjsパッケージをインストールします．ターミナルで次のコマンドを実行してください．
```bash
npm install
```

つづいて，index.htmlの29行目付近にある`main.js`に関する部分を変更します．
```diff
- <script type="module" src="/main.js"></script>
+ <script type="module" src="/message.js"></script>
```

つづいて，次のコマンドでコードを実行します．
```bash
npm run dev
```

localhostにコードの実行結果が送られます．VSCodeがそれを検出して，ブラウザで開くかどうか聞いてくるので，「Open in Browser」を押してページを開いてください．ウェブブラウザで黒っぽい画面が表示されれば成功です．

## Step 3: Message Edit Exercise

ここからページ内のテキストを編集してみます．まずはmessage.jsを開きます．

message.jsでは`document.querySelector("#message")`で`id="message"`のhtml Elementを取得して内容(`textContent`)を書き換えています．実際に次のように代入する文字列を変更してみましょう．ファイルを保存すると，自動的にWebページもリロードされて表示される内容も更新されます．いろいろなテキストを代入して遊んでみましょう．

```diff
- msgElement.textContent = "Hello Html!";
+ msgElement.textContent = "Hello Awesome Html!";
```

## Step 4: Camera
今度はカメラに接続して，動画をページ上に表示していきます．index.htmlの次の行を書き換えてください．またPCにカメラが内蔵されていない場合は，Webカメラを接続してください．
```diff
- <script type="module" src="/message.js"></script>
+ <script type="module" src="/camera.js"></script>
```
ブラウザのページを開くとカメラへのアクセス許可を求められるので，承認してください．カメラに接続できると，動画がページに表示されます．

デフォルトではカメラに写った画像がそのまま表示されます．カメラを自分に向けて使っている場合は，手や顔の動きと画面上の動きが逆になっていて違和感があるかもしれません．

camera.jsの`initCamera`内の次の記述を変更して，カメラ画面を反転させてみましょう．
```diff
- // some options ...
+ video.style.transform="scaleX(-1)";
```

## Step 5: Hand Gesture Recognition
ここからはMediaPipeを使って手のジェスチャーの認識を行っていきます．
まずは[公式サイト](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer#models)からモデルのデータをダウンロードします．ダウンロードしたら，
ファイルを`{project_folder}/gesture_recognizer.task`として保存します．

さらに，index.htmlの次の行を書き換えてください．
```diff
- <script type="module" src="/camera.js"></script>
+ <script type="module" src="/gesture_demo.js"></script>
```

ブラウザ側でMLモデルが読み込まれた後に，カメラ画像が表示されます．カメラに手を向けると，手の骨格と認識しているジェスチャーが表示されます．


## Final Step: Light Control
認識したジェスチャーに応じてIoTライトにデータを送信します．MQTTではBrokerを介して通信をしますが，初めにBrokerにログインできるようにUserNameとPasswordを設定します．
`.env`という名前のファイルを作成し，次のように記述します(実際の値は別紙参照)．
```bash
VITE_MQTT_USERNAME="${your_mqtt_username}"
VITE_MQTT_PASSWORD="${your_mqtt_password}"
```

続いて，index.htmlの次の行を書き換えてください．
```diff
- <script type="module" src="/gesture_demo.js"></script>
+ <script type="module" src="/main.js"></script>
```

環境変数(.envファイルの中身)を読み込むにはnpmを実行し直す必要があります．ターミナルでCrtl+Cを押してスクリプトを停止させて，再度`npm run dev`を実行してください．

ブラウザ側ではStep 5と同じようにジェスチャーの認識が行われてます．デフォルトでは"Victory"で点灯，"Closed_Fist"で消灯コマンドが送信されます．実際にジェスチャーを認識させてライトを操作してみましょう．

ここまででワークショップは終了です．おつかれさまでした．