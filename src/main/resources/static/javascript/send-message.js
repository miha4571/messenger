
async function encodeMessage() {
    try {
        document.getElementById("encodedMessage2").value = 'Encrypting...';
        console.log('Public key: ' + receiverPublicKey);
        let jwk = JSON.parse(receiverPublicKey);
        let publicKey = await crypto.subtle.importKey(
            "jwk",
            jwk,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            true,
            ["encrypt"]
        );

        // read message
        let rawMessage = document.getElementById("rawMessage").value;
        console.log('Raw message: ' + rawMessage);

        // encode message
        let encoder = new TextEncoder();
        let encodedMessage = encoder.encode(rawMessage);
        let encryptedMessage = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            publicKey,
            encodedMessage
        );

        // write message
        let base64Message = btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedMessage)));
        console.log('Encrypted message: ' + base64Message);
        document.getElementById("encodedMessage2").value = base64Message;
        document.getElementById("sendButton").disabled = false;
    } catch (e) {
        console.log("Exception: " + e);
    }
}

function setUserId(userIdPar) {
    userId = userIdPar;
}

function setPublicKey(publicKeyParam) {
    let publicKeyExport = document.getElementById("publicKey");
    publicKeyExport.value = publicKeyParam;
}