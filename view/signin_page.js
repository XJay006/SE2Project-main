import { root } from "./elements.js";


export async function signinPageView(){
    const response = await fetch('./view/templates/signin_page_template.html',
        {cache: 'no-store'});

    const divWrapper = document.createElement('div');
    divWrapper.style.width  = "400px";
    divWrapper.classList.add('m-4', 'p-4');
    divWrapper.innerHTML = await response.text();

    // attach for submit event listener
    const form =divWrapper.getElementsByTagName('form')[0];
    

    root.innerHTML = ''; // clear surrent page rendering
    root.appendChild(divWrapper);
}