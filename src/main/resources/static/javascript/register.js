
async function generateAndSaveKeyPair() {

    let messengerAppData = {};
    if(localStorage.getItem("messengerAppData")) {
        messengerAppData = JSON.parse(localStorage.getItem("messengerAppData"));
    }

    let username = document.getElementById("username").innerText;

    if(localStorage.getItem("private_" + username)) {
        console.log(username + " keypair already exists.");
        return;
    }

    let keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );

    let privateKeyExport = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
    let publicKeyExport = await crypto.subtle.exportKey("jwk", keyPair.publicKey);

    let publicKeyInputField = document.getElementById("publicKey");

    // write public key to form
    publicKeyInputField.value = JSON.stringify(publicKeyExport);

    // save private key to local storage
    messengerAppData.tempNewRegistrationPrivateKey = JSON.stringify(privateKeyExport);
    localStorage.setItem("messengerAppData", JSON.stringify(messengerAppData));

    console.log("Private key: " + JSON.stringify(privateKeyExport));
    console.log("Public key: " + JSON.stringify(publicKeyExport));
    console.log("Generation ok.");
}