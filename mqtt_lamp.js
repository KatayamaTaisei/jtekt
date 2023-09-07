import MQTT from "paho-mqtt";

const { VITE_MQTT_USERNAME, VITE_MQTT_PASSWORD } = import.meta.env;
const msgElement = document.querySelector("#message");
const msgElement1 = document.querySelector("#message1");
const msgElement2 = document.querySelector("#message2");
const textbox = document.getElementById("text")

let connected = false;
export const mqttClient = new MQTT.Client("mqtt.jtektrdmc.io", 443, "/","katayamataisei");

const onFailure = () => {
    console.error("MQTT connection failed");
};

const onSuccess = () => {
    console.log("MQTT connected");
    connected = true;
    mqttClient.subscribe("client1");
    mqttClient.onMessageArrived = myMessageArrived;
    mqttClient.subscribe("winner");
}

export const initMqttClient = async () => {
    mqttClient.onConnectionLost = () => {
        console.log("MQTT connection lost");
        connected = false;
    };

    mqttClient.connect({
        onSuccess,
        onFailure,
        userName: VITE_MQTT_USERNAME,
        password: VITE_MQTT_PASSWORD,
        useSSL: true,
        keepAliveInterval: 30,
        reconnect: true,
    });
    
};

const myMessageArrived = (message) => {
    const payload = JSON.parse(message.payloadString)
    if(message.destinationName==="client1"){
        const state = payload.state
        console.log(state);
        console.log(message.destinationName);
        msgElement.textContent = state
    }
    else if (message.destinationName==="winner"){
        const state1 = payload.winner
        msgElement2.textContent = "Winner is "+state1
    }
};

export const mqttPublish = (state) => {
    if (!connected) return;
    const message = new MQTT.Message(JSON.stringify({ state }));
    message.destinationName = "client1";
    mqttClient.send(message);
    console.log(`[MQTT] Sent ${state}`);
};

document.getElementById("button1").onclick = function(){
    const value = textbox.value;
    msgElement1.textContent = "Playername is "+value;
}