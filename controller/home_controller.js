import { getBotMsg } from "./gemini_controller.js";

export async function onSubmitChatForm(e) {
  e.preventDefault();

  const messageInput = e.target.elements['chat-input'];
  const userMessage = messageInput.value.trim();

  if (userMessage === '') return;

  // Append user's message to the chat window
  appendMessage(userMessage, 'user');

  messageInput.value = ''; 

  // Simulate chatbot response
   setTimeout(async () => {
    const botResponse =  await getBotMsg(userMessage);
    // const botResponse = generateBotResponse(userMessage);
    appendMessage(botResponse, 'bot');
  }, 500); 
}
  
 export function appendMessage(message, sender) {
    const chatWindow = document.getElementById('chat-window');
  
    const messageDiv = document.createElement('div');
  
    if (sender === 'user') {
      messageDiv.classList.add('d-flex', 'justify-content-end', 'mb-2');
      messageDiv.innerHTML = `
        <div class="d-flex align-items-center">
          <div class="message-content bg-primary text-white p-2 rounded">
            ${message}
          </div>
          <i class="bi bi-person-circle ms-2" style="font-size: 2rem; color: #0d6efd;"></i>
        </div>
      `;
    } else {
      messageDiv.classList.add('d-flex', 'justify-content-start', 'mb-2');
      messageDiv.innerHTML = `
        <div class="d-flex align-items-center">
          <i class="bi bi-robot me-2" style="font-size: 2rem; color: #6c757d;"></i>
          <div class="message-content bg-secondary text-white p-2 rounded">
            ${message}
          </div>
        </div>
      `;
    }
  
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  
  function generateBotResponse(userMessage) {
    // testing for chat respinse 
    return 'This is a simulated chatbot response to: ' + userMessage;
  }
  
  export function onRenameChat(e){
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 1000;

    // Create the pop-up container
    const popup = document.createElement('div');
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.borderRadius = '8px';
    popup.style.textAlign = 'center';
    popup.style.width = '300px';

    // Create the input field
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter your name';
    input.style.width = '100%';
    input.style.padding = '10px';
    input.style.marginBottom = '10px';

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.style.padding = '10px 20px';
    submitButton.style.cursor = 'pointer';

    // Append input and button to the popup
    popup.appendChild(input);
    popup.appendChild(submitButton);

    // Append popup to overlay
    overlay.appendChild(popup);

    // Append overlay to the body
    document.body.appendChild(overlay);

    // Handle button click to get the name
    submitButton.addEventListener('click', () => {
      const name = input.value;
      if (name) {
        // Set Chat Name
        document.getElementById('chat-title').textContent = name;

        document.body.removeChild(overlay);
      } else {
        alert('Please enter a name.');
      }
    });
  } 

  export function setChatName(name){
    if (name) {
      document.getElementById('chat-title').textContent = name;
    } else {
      document.getElementById('chat-title').textContent = "Loaded Chat";
    }
  }