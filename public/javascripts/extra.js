

const inputField = document.getElementById("chat-input");

const socketRoute = document.getElementById("ws-route").value;
const socket = new WebSocket(socketRoute.replace("http","ws"));


inputField.onkeydown = (event) => {
    if(event.key === 'Enter'){
        if(inputField.value != ""){
            socket.send(inputField.value)
            addOutgoing(inputField.value)
            inputField.value = '';
        }
    }
}

socket.onmessage = (event) => {
    addIncoming(event.data)
}



function addIncoming(msg) {
  var node1 = document.createElement("div");
  node1.className = "incoming"

  var node2 = document.createElement("div");
  node2.className = "bubble"

  var node3 = document.createElement("p");
  var textnode = document.createTextNode(msg);
  node3.appendChild(textnode);
  node2.appendChild(node3);
  node1.appendChild(node2);
  document.getElementsByClassName("body")[0].appendChild(node1);
  console.log("done")
}

function addOutgoing(msg) {
  var node1 = document.createElement("div");
  node1.className = "outgoing"

  var node2 = document.createElement("div");
  node2.className = "bubble"

  var node3 = document.createElement("p");
  var textnode = document.createTextNode(msg);
  node3.appendChild(textnode);
  node2.appendChild(node3);
  node1.appendChild(node2);
  document.getElementsByClassName("body")[0].appendChild(node1);
  console.log("done")
}
