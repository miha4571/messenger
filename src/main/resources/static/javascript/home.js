
// check to save private key after first login after registration
function registerCheck(userId) {
    let messengerAppData = {};
    if(localStorage.getItem("messengerAppData")) {
        messengerAppData = JSON.parse(localStorage.getItem("messengerAppData"));
    }

    if(messengerAppData.tempNewRegistrationPrivateKey && userId) {
        // registration was successful and we're logged in
        if(!messengerAppData.userData) {
            messengerAppData.userData = [];
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