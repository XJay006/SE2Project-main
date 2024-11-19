const defaultSettings = {
    typingSpeed: 500,
    temperature: 0.5,
  };
  
  let currentSettings = { ...defaultSettings };
  
  export function getSettings() {
    return currentSettings;
  }
  
  export function updateSettings(newSettings) {
    currentSettings = { ...currentSettings, ...newSettings };
    console.log('Updated settings:', currentSettings);
  }
  