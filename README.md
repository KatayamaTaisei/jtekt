# MediaPipe MQTT Vite

Control IoT Gadgets with MediaPipe Inference

## Setup

### Nodejs setup

```bash
git clone {this_repository_url}
cd {this_project}
npm install # install nodejs modules
```

### Download ML Model

Download a task file from [this model distribution page](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer#models) and save it as `{project_root}/gesture_recognizer.task`

The _task_ file is a MediaPipe ML model file including labels data.

### Set MQTT username and password

Create a `.env` file with the following content:

```
VITE_MQTT_USERNAME=yourmqttusername
VITE_MQTT_PASSWORD=yourmqttpassword
```

where `yourmqttusername` and `yourmqttpassword` in are to be replaced with the actual username and password

## Execute

Please attach a webcam to a PC and run the test page. When you use VSCode, a notification pane leads you to the test page.

```bash
npm run dev
```

Some seconds after opening the page, a camera preview window display a camera image and gesture recognition results. When the recognizer catch "Victory" and "Closed_Fist", the page send "lamp-on" and "lamp-off" commands, respectively.
