document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messagesList = document.getElementById("messagesList");

  // Load messages from localStorage on page load
  const storedMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  storedMessages.forEach(displayMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && validateEmail(email) && message) {
      const newMessage = { name, email, message };

      // Add message to the UI
      displayMessage(newMessage);

      // Save to localStorage
      storedMessages.push(newMessage);
      localStorage.setItem("contactMessages", JSON.stringify(storedMessages));

      // Clear form inputs
      form.reset();

      // Show success message
      showTempMessage("Message submitted successfully!", "green");
    } else {
      showTempMessage("Please enter valid information in all fields.", "red");
    }
  });

  // Helper to display a message in the DOM
  function displayMessage({ name, email, message }) {
    const messageItem = document.createElement("li");
    messageItem.className = "bg-white p-4 border rounded shadow";
    messageItem.innerHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    messagesList.appendChild(messageItem);
  }

  // Helper to show temporary alert
  function showTempMessage(msg, color = "green") {
    const temp = document.createElement("div");
    temp.className = `text-${color}-700 bg-${color}-100 border border-${color}-400 px-4 py-2 rounded mt-4`;
    temp.innerText = msg;
    form.appendChild(temp);
    setTimeout(() => temp.remove(), 3000);
  }

  // Basic email validator
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});
