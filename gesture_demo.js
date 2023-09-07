import "./style.css";

import { initCamHandGesture } from "./hand_gesture";
const titleElement = document.querySelector("#page_title");
titleElement.textContent="Hand Gesture Recognition Demo";


await initCamHandGesture();

