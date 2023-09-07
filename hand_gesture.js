// This code is based on MediaPipe official code example
// https://codepen.io/mediapipe-preview/pen/zYamdVd
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import { mqttPublish } from "./mqtt_lamp";
export const initCamHandGesture = async () => {
    const video = document.querySelector("#webcam");
    const canvasElement = document.querySelector("#output_canvas");
    const gestureDisplay = document.querySelector("#gesture_display");
    const canvasCtx = canvasElement.getContext("2d");
    const msgElement = document.querySelector("#message");

    let prevGesture = "";

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            video.srcObject = stream;
            video.play();
            msgElement.textContent = "The camera is available";
        } catch (error) {
            alert("Error accessing the camera");
            console.error("Error accessing the camera: ", error);
            msgElement.textContent = "Error accessing the camera";
        }
    } else {
        alert("Sorry, your browser does not support the camera API.");
    }

    const vision = await FilesetResolver.forVisionTasks(
        // path/to/wasm/root
        "node_modules/@mediapipe/tasks-vision/wasm"
    );

    msgElement.textContent = "Loading the ML model...";
    const gestureRecognizer = await GestureRecognizer.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath: "./gesture_recognizer.task",
                delegate: "GPU", //CPU or GPUで処理するかを指定する
            },
            numHands: 2, //認識できる手の数
        }
    );
    msgElement.textContent = "Recognizing...";

    await gestureRecognizer.setOptions({ runningMode: "video" });

    let lastVideoTime = -1;

    const renderLoop = () => {
        if (video.currentTime > 0 && video.currentTime !== lastVideoTime) {
            canvasElement.width = video.videoWidth;
            canvasElement.height = video.videoHeight;
            let nowInMs = Date.now();
            const results = gestureRecognizer.recognizeForVideo(video, nowInMs);
            lastVideoTime = video.currentTime;
            canvasCtx.save();
            canvasCtx.clearRect(
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );
            canvasCtx.drawImage(
                video,
                0,
                0,
                canvasElement.width,
                canvasElement.height
            );

            if (results.landmarks) {
                for (const landmarks of results.landmarks) {
                    drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                        color: "#F0F0F0",
                        lineWidth: 5,
                    });
                    drawLandmarks(canvasCtx, landmarks, {
                        color: "#4378B9",
                        lineWidth: 2,
                    }); // JTEKT(KOYO) Blue
                }
            }

            if (results.gestures.length > 0) {
                gestureDisplay.style.display = "block";
                gestureDisplay.style.width = canvasElement.width;
                const categoryName = results.gestures[0][0].categoryName;
                const categoryScore = parseFloat(
                    results.gestures[0][0].score * 100
                ).toFixed(2);
                gestureDisplay.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %`;

                if (prevGesture !== categoryName) {
                    if(categoryName !== "None") mqttPublish(categoryName);
                }
                prevGesture = categoryName;
            } else {
                gestureDisplay.style.display = "block";
                gestureDisplay.innerText = `GestureRecognizer: No Hand \n Confidence:--- %`;
                prevGesture = "";
            }

            canvasCtx.restore();
        }

        requestAnimationFrame(() => {
            renderLoop();
        });
    };

    // canvas display options
    // some options ..., e.g. canvasElement.style = "***"

    renderLoop();
};
