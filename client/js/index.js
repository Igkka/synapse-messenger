const msgBox = document.querySelector("#chat-msg-dialog")
const msgInput = document.querySelector("#message-input")
const sendMsgBtn = document.querySelector("#send-msg")

let user = prompt("Введите ваше имя пользователя")
const socket = io()



const createMessage = (msg,name) => {
    
    let now = new Date();
    let currentDate = `${ String( now.getHours()).padStart(2,"0")} : ${ String( now.getMinutes()).padStart(2,"0")}`;


    return(`
        
        <div class="message">
            <div class="message_name">${name}</div>
            <p>${msg}</p>
            <div class="date">${currentDate}</div>
        </div>
        
        `)

}

const sendMessage = () => {

    let user_data = {msg:msgInput.value,user_name:user}

    if(msgInput.value.length == 0){
        alert("Ничего не написано")
        return
    }

    socket.emit("chat message",user_data)


    console.log("Сообщение отправлено")
    msgInput.value = ""
}

window.addEventListener("keypress",(e) => {
    let pressedKey = e.key
    if(pressedKey == "Enter"){
        sendMessage()
    }
})

sendMsgBtn.addEventListener("click",() => {
    sendMessage()
})

socket.on("chat message",(data)=> {
    const {msg,user_name} = data
    msgBox.innerHTML += createMessage(msg,user_name)
})