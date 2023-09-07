import "./style.css";

import { initCamHandGesture } from "./hand_gesture";
import { initMqttClient } from "./mqtt_lamp";

await initCamHandGesture();

await initMqttClient();
