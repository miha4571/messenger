
async function encodeTestMessage() {
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

async function decodeTestMessage() {
    try {
        // read private key
        let privateKeyExport = document.getElementById("privateKey").value;
        console.log('Private key: ' + privateKeyExport);
        let jwk = JSON.parse(privateKeyExport);
        let privateKey = await crypto.subtle.importKey(
            "jwk",
            jwk,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            true,
            ["decrypt"]
        );

        // read message
        let encryptedMessage = document.getElementById("encodedMessage2").value;
        let encryptedMessageArrayBuffer = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0))
        console.log('Encrypted message: ' + encryptedMessage);

        // decode message
        let decryptedMessage = await window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            privateKey,
            encryptedMessageArrayBuffer
        );

        // write message
        let decoder = new TextDecoder();
        let decodedMessage = decoder.decode(decryptedMessage);
        console.log('Decrypted message: ' + decryptedMessage);
        document.getElementById("decodedMessage").value = decodedMessage;
    } catch (e) {
        console.log("Exception: " + e);
    }
}