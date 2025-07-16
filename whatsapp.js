document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleChat");
  const chatBox = document.getElementById("chatBox");
  const sendBtn = document.getElementById("sendWhatsApp");
  const messageInput = document.getElementById("whatsappMessage");

  toggleBtn.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  });

  sendBtn.addEventListener("click", (e) => {
    const msg = encodeURIComponent(messageInput.value.trim());
    const phone = "573014874771"; // Tu número

    if (!msg) {
      e.preventDefault(); // Previene abrir el enlace
      alert("Escribe un mensaje primero.");
      return;
    }

    // Establece el enlace al botón tipo <a>
    sendBtn.setAttribute("href", `https://wa.me/${phone}?text=${msg}`);
    chatBox.style.display = "none";
  });

  
});
