
async function encodeMessage() {
    try {
        // read public key
        let publicKeyExport = document.getElementById("publicKey").value;
        console.log('Public key: ' + publicKeyExport);
        let jwk = JSON.parse(publicKeyExport);
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
        let rawMessage = document.getElementById("message").value;
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
        document.getElementById("encodedMessage").value = base64Message;
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