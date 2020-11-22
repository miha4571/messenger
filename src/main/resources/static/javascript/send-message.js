
function encodeMessage() {
    const messageField = document.getElementById("message");
    const messageContent = messageField.value;
    messageField.value = messageContent + ' test';
}
