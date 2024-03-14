import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-76edf-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsInDB = ref(database, 'messages')

const endorsTextEL = document.getElementById('endors-text')
const fromEl = document.getElementById('from-input')
const toEL = document.getElementById('to-input')
const publishBtn = document.getElementById('publish-btn')
const endorsmentsEl = document.getElementById('endorsments')
let likeIconClass = ''
let msgArray = {}




publishBtn.addEventListener('click', function () {
    console.log(fromEl.value, toEL.value, endorsTextEL.value)
    const messages = {
        sender: fromEl.value,
        reciever: toEL.value,
        text: endorsTextEL.value,

    }

    push(endorsInDB, messages)
})

onValue(endorsInDB, function (snapshot){
    if (snapshot.exists()) {
          msgArray = Object.entries(snapshot.val())
        console.log(msgArray)

        clearTextArea()

         msgArray.map(function (item) {
            let msgID = item[0]
            let sender = item[1].sender
            let reciever = item[1].reciever
            let message = item[1].text
            // console.log(message)
        endorsmentsEl.innerHTML +=  ` <div class = 'messages'> <span id="To-text"  class="bold-text">To, ${reciever} </span>
            <p>${message}</p>
           <span id="from-text" class="bold-text">From, ${sender} </span>
           
           <i class="fa-solid fa-heart ${likeIconClass} " data-like = {msgID}></i>
            </div>`
        })


    }

})









function clearTextArea() {

    endorsTextEL.value = ''
    fromEl.value = ''
    toEL.value = ''

}