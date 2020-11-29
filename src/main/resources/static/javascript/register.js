
async function generateAndSaveKeyPair() {

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

    publicKeyInputField.value = JSON.stringify(publicKeyExport);

    localStorage.setItem("last_private", JSON.stringify(privateKeyExport));

    localStorage.setItem("last_public", JSON.stringify(publicKeyExport));

    console.log("private key generated");
}