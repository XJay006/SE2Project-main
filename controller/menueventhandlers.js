import { homePageView } from "../view/home_page.js";
import { HistoryPageView } from "../view/history_page.js";

import { routePathNames } from "./route_controller.js";
import { settingsPageView } from '../view/settings_page.js';
import { updateSettings } from './settings_controller.js';

export function onClickHomeMenu(e) {
    history.pushState(null, null, routePathNames.HOME);
    homePageView();
}

export function onClickHistoryMenu(e) {
    history.pushState(null, null, routePathNames.HISTORY);
    HistoryPageView();
}

export function onNewChat(e) {
    history.pushState(null, null, routePathNames.HOME);
    LoadedPageView();
}



export async function onClickSignOutMenu(e) {

}

export async function onClickSettingsMenu() {
    console.log("Settings button clicked!");
    await settingsPageView(); // Wait for the settings page to load

    // Set initial values from current settings
    const currentSettings = getSettings();
    document.getElementById('typing-speed').value = currentSettings.typingSpeed;
    document.getElementById('temperature').value = currentSettings.temperature;
    document.getElementById('temperature-value').innerText = currentSettings.temperature;

    // Update temperature value display when the range input changes
    document.getElementById('temperature').oninput = function () {
        document.getElementById('temperature-value').innerText = this.value;
    };

    document.getElementById('save-settings').onclick = function () {
        const typingSpeed = parseInt(document.getElementById('typing-speed').value);
        const temperature = parseFloat(document.getElementById('temperature').value);

        updateSettings({ typingSpeed, temperature });
        alert('Settings saved successfully!');
    };
}