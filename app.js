import { onClickHomeMenu, onClickHistoryMenu, onClickSignOutMenu, onNewChat, onClickSettingsMenu } from './controller/menueventhandlers.js';
import { routing } from './controller/route_controller.js';
import { signinPageView } from './view/signin_page.js';

// menu button handler
const homeButton = document.getElementById('menu-home');
homeButton.onclick = onClickHomeMenu;
document.getElementById('menu-history').onclick = onClickHistoryMenu;
document.getElementById('menu-signout').onclick = onClickSignOutMenu;
document.getElementById('newChat').onclick = onNewChat;
document.getElementById('menu-settings').onclick = onClickSettingsMenu;


//attachAuthStateChangeObserver(); // attach observer for auth state change

window.onload = function(e){

    const pathname = window.location.pathname;
    const hash = window.location.hash;
    routing(pathname,hash);
    // console.log('pathname: ', pathname);
    // console.log('hash: ', hash);
}

window.onpopstate = function(e){
    e.preventDefault();
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    routing(pathname,hash);
}