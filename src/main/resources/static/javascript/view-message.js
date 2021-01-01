
async function decodeMessage() {
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