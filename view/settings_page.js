import { root } from './elements.js';

export async function settingsPageView(){
  const response = await fetch('./view/templates/settings_page_template.html', { cache: 'no-store' });
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = await response.text();
  divWrapper.classList.add('m-4', 'p-4');

  root.innerHTML = '';
  root.appendChild(divWrapper);
}