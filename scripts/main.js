// -----------------------------
// main.js
// Central JS entry point
// -----------------------------

// You can call functions or initialize features from other modules here.
// Example: When you add more JS files later (like about.js, contact.js), 
// import them or reference them here.

document.addEventListener("DOMContentLoaded", () => {
  console.log("Main.js loaded and ready.");
  
  // Future feature hooks can go here:
  // initChatbot();
  // loadProjects();
  // etc.
});

document.getElementById("open-chat-btn").onclick = () => {
  const popup = document.getElementById("chat-popup");
  popup.style.display = popup.style.display === "none" ? "flex" : "none";
};

document.getElementById("send-btn").onclick = async () => {
  const input = document.getElementById("chat-input");
  const query = input.value.trim();
  if (!query) return;

  const messagesDiv = document.getElementById("chat-messages");
  messagesDiv.innerHTML += `<div><b>You:</b> ${query}</div>`;
  input.value = "";

  try {
    const response = await fetch(`http://127.0.0.1:8000/ask/?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    messagesDiv.innerHTML += `<div><b>Bot:</b> ${data.answer}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (err) {
    messagesDiv.innerHTML += `<div><b>Bot:</b> Sorry, there was an error. Try again later.</div>`;
  }
};

