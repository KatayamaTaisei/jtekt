import "./style.css";
const initCamera = async () => {
    const video = document.querySelector("#webcam");
    const msgElement = document.querySelector("#message");
    const canvasElement = document.querySelector("#output_canvas");
    const titleElement = document.querySelector("#page_title");
    titleElement.textContent="WebCam Demo";
    video.style.display ="block";
    canvasElement.style.display= "none";
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            video.srcObject = stream;
            video.play();
            msgElement.textContent="The camera is available";
            
        } catch (error) {
            alert("Error accessing the camera");
            console.error("Error accessing the camera: ", error);
            msgElement.textContent="Error accessing the camera";
        }
    } else {
        alert("Sorry, your browser does not support the camera API.");
    }

    // video display options
    video.style.transform="scaleX(-1)";
    // some options ...
};

await initCamera();