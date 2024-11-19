import { root } from './elements.js';
import { onSubmitChatForm, onRenameChat, appendMessage, setChatName } from '../controller/home_controller.js';

export async function LoadedPageView(name, file){
  const filePath = file
  const response = await fetch('./view/templates/home_page_template.html', { cache: 'no-store' });
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = await response.text();
  divWrapper.classList.add('m-4', 'p-4');

  const chatForm = divWrapper.querySelector('#chat-form');
  chatForm.onsubmit = onSubmitChatForm;

  root.innerHTML = '';
  root.appendChild(divWrapper);

  const renameButton = divWrapper.querySelector('#rename-chat');
  if (renameButton) {
    onRenameChat; // Attach the listener here
  }
  setChatName(name);
  processChatFile(filePath)
}

export async function processChatFile(filePath) {
    try {
      const response = await fetch(filePath, { cache: 'no-store' });
      const text = await response.text();
  
      // Split the text file into lines
      const lines = text.split('\n');
  
      // Process each line
      lines.forEach(line => {
        // Trim whitespace and check if the line has content
        if (line.trim()) {
          const sender = line.startsWith('<S>') ? 'user' : line.startsWith('<R>') ? 'bot' : null;
  
          // Extract the message by removing the header
          const message = line.slice(3).trim();
  
          if (sender && message) {
            // Call appendMessage with the message and sender
            appendMessage(message, sender);
          }
        }
      });
    } catch (error) {
      console.error('Error reading the chat file:', error);
    }
  }
  