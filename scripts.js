// Community Chat System
function sendMessage() {
    let input = document.getElementById("chat-input");
    let message = input.value.trim();
    if (message) {
        let chatBox = document.getElementById("chat-box");
        let newMessage = document.createElement("p");
        newMessage.textContent = message;
        chatBox.appendChild(newMessage);
        input.value = "";
    }
}

// Simple 2D Platformer Logic
let tickets = 0;
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {  // Simulate level completion
        tickets += 10;
        document.getElementById("tickets").textContent = tickets;
        alert("Level complete! You earned 10 tickets!");
    }
});
