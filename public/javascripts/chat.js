

const inputField = document.getElementById("chat-input");
const outputArea = document.getElementById("chat-area");
const submitButton = document.getElementById("submit");

const socketRoute = document.getElementById("ws-route").value;
const username = document.getElementById("username").value;
console.log(username)
const socket = new WebSocket(socketRoute.replace("http","ws"));

inputField.onkeydown = (event) => {
    if(event.key === 'Enter'){
        if(inputField.value != ""){
            socket.send(inputField.value)
            outputArea.value += '\n' + inputField.value;
            inputField.value = '';

        }
    }
}
submitButton.onclick = () => {
    if(inputField.value != ""){
        socket.send(inputField.value,username)
        outputArea.value += '\n' + inputField.value;
        inputField.value = '';

    }
}

socket.onopen = ()=>socket.send(username + " Joined");



socket.onmessage = (event) => {
    outputArea.value += '\n' + event.data;
}
