// const socket = io()
// var Name;  
// let textarea = document.querySelector('#textarea')
// let messageArea = document.querySelector('.message__area')
// let typehere = document.querySelector('.typehere')

// do{
//    Name = prompt('Please enter your name: ')
// }while(!Name)

// console.log(Name)

// textarea.addEventListener('keyup', (e) => {
//     if (e.isComposing || e.keyCode === 13){
//         sendMessage(e.target.value)
//     }
// })

// function sendMessage(message){
//     let msg = {
//         user : Name,
//         message : message
//     }

//     //append message

//     appendMessage(msg, 'outgoing')
// }

// function appendMessage(msg, type){
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')

//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)
// }

const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// socket.on('new-user', (name) =>{
//     appendUser(name, 'incoming')
// })

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}
//  to display new user
// function appendUser(name, type){
//     let nameDiv = document.createElement('div')
//     let className = type
//     nameDiv.classList.add(className, 'message')

//     let markup = `
//         <h4>Hello</h4>
//         <p>${msg.user + ": Joined the chat"}</p>
//     `
//     nameDiv.innerHTML = markup
//     messageArea.appendChild(nameDiv)
// }

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}