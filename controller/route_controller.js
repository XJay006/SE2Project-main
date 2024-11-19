import { homePageView } from "../view/home_page.js"
import { HistoryPageView } from "../view/history_page.js"
import { settingsPageView } from '../view/settings_page.js';

export const routePathNames = {
    HOME: '/',
    HISTORY: '/history',
    LOADED: '/loadedchat',
    SETTINGS: '/settings',
}

export const routes = [
    { path: routePathNames.HOME, page: homePageView },
    { path: routePathNames.HISTORY, page: HistoryPageView },
    { path: routePathNames.SETTINGS, page: settingsPageView },
];

export function routing(pathname, hash) {
    const route = routes.find(r => r.path == pathname);
    if (route) {
        if (hash && hash.length > 1) {
            route.page(hash.substring(1));
        } else { 
            route.page(); 
        }
    } else {
        routes[0].page();
    }
}