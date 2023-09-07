// message playground

import "./style.css";

const message_accessor = ()=>{
    // get element which has the "message" id
    const msgElement = document.querySelector("#message");
    // change its text content
    msgElement.textContent = "Hello World!";

    const titleElement = document.querySelector("#page_title");
    titleElement.textContent="Message Edit Exercise";
}

message_accessor();