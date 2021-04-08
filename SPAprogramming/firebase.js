const firebaseConfig = {
    apiKey: "AIzaSyACZIAA096A_q9S8cdCVSOuY7Bq55Z4hxQ",
    authDomain: "eyes-talk.firebaseapp.com",
    projectId: "eyes-talk",
    storageBucket: "eyes-talk.appspot.com",
    messagingSenderId: "128029044951",
    appId: "1:128029044951:web:d39c6f8882147a8f28c092",
    measurementId: "G-BTHQJCS7SQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

var emailstr = ""
var myName = ""
var email = ""
var password = ""
var user = ""
var mailstr = ""
var message = ""

//signup
function signup() {

    var email = document.getElementById("semail")
    var password = document.getElementById("spassword")
    var confpassword = document.getElementById("confpassword");

    if (confpassword.value != password.value) {
        alert("Passwords do not match")
        confpassword.value = ""
        password.value = ""
    } else {
        const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
        alert("Signed up using " + email.value)
        promise.catch(e => alert(e.message))
        signupToLogin()
    }

}



//sigin
function signin() {

    email = document.getElementById("email")
    password = document.getElementById("password")
    user = firebase.auth().currentUser;

    const promise = auth.signInWithEmailAndPassword(email.value, password.value)
    promise.catch(e => alert(e.message))

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            loginToCalib()
            emailstr = email.value
            mailstr = "@gmail.com"
            emailstr = emailstr.replace(mailstr, "");
            myName = emailstr
            document.getElementById("emailtxt").innerHTML = emailstr
            document.getElementById("emailend").innerHTML = mailstr
            document.getElementById('profile').style.display = 'block'

        }
        else {
            document.getElementById("emailtxt").innerHTML = ""

        }
    })
}

//logout 
function logout() {
    firebase.auth().signOut()
    window.location.reload()
    document.getElementById('profile').style.display = 'none';

}

//Messaging is here
function sendMessage() {
    // get message
    message = document.getElementById("message").value;

    // save in database
    firebase.database().ref("messages").push().set({
        "sender": myName,
        "message": message
    });

    document.getElementById("message").value = ""
    return false;


}

function scrollWindow() {
    var objDiv = document.getElementById("messagebox");
    objDiv.scrollTop = objDiv.scrollHeight;
}


firebase.database().ref("messages").on("child_added", function (snapshot) {
    // listen for incoming messages
    var html = "";
    // give each message a unique ID
    html += "<p class='messclass' id='message-" + snapshot.key + "'>";
    // show delete button if message is sent by me
    if (snapshot.val().sender === myName) {
        html = html.replace("class='messclass'", "class='selfclass'")
        //html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);' class='butdel'>";
        //html += "Delete";
        //html += "</button>";
    }
    html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</p>";

    document.getElementById("messages").innerHTML += html;
    //for scrolling to bottom
    var objDiv = document.getElementById("messagebox");
    objDiv.scrollTop = objDiv.scrollHeight;


});

function deleteMessage(self) {
    // get message ID
    var messageId = self.getAttribute("data-id");

    // delete message
    firebase.database().ref("messages").child(messageId).remove();
}

// attach listener for delete message
firebase.database().ref("messages").on("child_removed", function (snapshot) {
    // remove message node
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";

});

function clearMessage() {
    document.getElementById("message").value = ""
}


