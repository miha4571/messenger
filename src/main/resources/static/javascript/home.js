
// check to save private key after first login after registration
function registerCheck(userId) {
    let messengerAppData = {};
    if(localStorage.getItem("messengerAppData")) {
        messengerAppData = JSON.parse(localStorage.getItem("messengerAppData"));
    }

    if(messengerAppData.tempNewRegistrationPrivateKey && userId) {
        // registration was successful and we're logged in
        if(!messengerAppData.userData) {
            messengerAppData.userData = {};
        }
        if(!messengerAppData.userData[userId.toString()]) {
            messengerAppData.userData[userId.toString()] = {};
        }

        // save to current user data
        if(!messengerAppData.userData[userId.toString()].privateKey) {
            messengerAppData.userData[userId.toString()].privateKey = messengerAppData.tempNewRegistrationPrivateKey;
            console.log("Private key created on registration saved for user id " + userId + ".");
        }
        // clear temp property
        messengerAppData.tempNewRegistrationPrivateKey = undefined;

        localStorage.setItem("messengerAppData", JSON.stringify(messengerAppData));

    }
}


function isPrivateKeyMissing() {
    let messengerAppData = {};
    if(localStorage.getItem("messengerAppData")) {
        messengerAppData = JSON.parse(localStorage.getItem("messengerAppData"));
    } else {
        return true;
    }
    if(!messengerAppData.userData) {
        return true;
    }
    if(!messengerAppData.userData[userId.toString()]) {
        return true;
    }
    if(!messengerAppData.userData[userId.toString()].privateKey) {
        return true;
    }
    return false;
}

function privateKeyCheck(userId) {

    if(!userId) {
        // not logged in
        return;
    }

    let privateKeyMissing = isPrivateKeyMissing();
    console.log(privateKeyMissing);
    let message = document.getElementById("privateKeyCheckMessage");
    console.log(message);
    if(privateKeyMissing) {
        message.innerText = "Private key is missing!";
    } else {
        message.innerText = "Private key ok.";
    }
}