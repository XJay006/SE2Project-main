import { root } from './elements.js';
import { onSubmitChatForm, onRenameChat } from '../controller/home_controller.js';

export async function homePageView(){
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
    renameButton.onclick = onRenameChat; // Attach the listener here
  }
}
