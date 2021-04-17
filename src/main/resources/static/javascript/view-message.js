
async function decodeMessage() {
    try {
        document.getElementById("decodedMessage2").innerText = 'Decrypting...';

        // read private key
        let privateKeyExport = loggedInPrivateKey;
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
        let encryptedMessage = messageContent;
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
        console.log('Decrypted message: ' + decodedMessage);
        //document.getElementById("decodedMessage").value = decodedMessage;
        document.getElementById("decodedMessage2").innerText = decodedMessage;
    } catch (e) {
        console.log("Exception: " + e);
    }
}