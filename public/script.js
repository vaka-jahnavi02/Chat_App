const socket=io()

const messages=document.getElementById("messages")
const input=document.getElementById("input")
const form=document.getElementById("form")

const userName=prompt("Enter your name")
socket.emit("user:join",userName)

socket.on("global:message",(message)=>{
    messages.innerHTML+=`<p class="join-message"> ${message}</p>`
})

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    messages.innerHTML+=
    `<div class="sent_message_container">
    <p class="your_name">you</p>
    <p class="sent_message">${input.value}</p>
    </div>`
    socket.emit("message:send",{name:userName, message:input.value})
    input.value=""
})

socket.on("message:receive",(payload)=>{
    messages.innerHTML+=
    `<div class="message_receive_container">
    <p class="receiver_name">${payload.name}</p>
    <p class="sent_message">${payload.message}</p>
    </div>`
})

