import { root } from "./elements.js";
import { LoadedPageView } from "../view/load_page.js";
import { routePathNames } from "../controller/route_controller.js";
import { protectedView } from "./protected_view.js";

// Function to load chat history from an XML file
// Function to load chat history for the selected chat file
async function loadChatHistory(fileName) {
    const response = await fetch(fileName);
    if (!response.ok) {
        console.error("Failed to fetch chat history:", response.statusText);
        return []; // Return an empty array if there's an error
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Assuming you have a structure to get user and message
    const messages = Array.from(xmlDoc.getElementsByTagName("chat")); // Adjust this based on your XML structure
    return messages.map(chat => ({
        name: chat.getElementsByTagName("name")[0].textContent.trim(), // Assuming name is inside chat
        file: chat.getElementsByTagName("file")[0].textContent.trim() // Assuming file is the message here
    }));
}



// Function to display the history page
export async function HistoryPageView() {
    // Fetch the history page template
    const response = await fetch('./view/templates/history_page_template.html', { cache: 'no-store' });
    
    // Create a wrapper for the content
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    // Clear the root and append the new content
    root.innerHTML = '';
    root.appendChild(divWrapper);

    // Call loadChats to display the chat messages
    loadChats();
}


// Load chats and add event listeners for buttons
async function loadChats() {
    const fileName = './chat_history.xml'; // Path to your chat history XML
    const chatHistory = await loadChatHistory(fileName); // Load chat history

    const historyContainer = document.getElementById('history-container'); // Ensure this ID matches your HTML template

    // Clear previous messages
    historyContainer.innerHTML = '';

    if (chatHistory.length > 0) {
        chatHistory.forEach(entry => {
            const button = document.createElement('button');
            button.className = 'chat-button'; // Add a class for styling
            button.innerText = entry.name; // Use the name as the button text

            // Set the button styles
            button.style.display = 'block'; // Stack buttons vertically
            button.style.width = '100%'; // Make buttons full width
            button.style.padding = '10px'; // Add padding for better click area
            button.style.marginBottom = '5px'; // Space between buttons
            button.style.borderRadius = '5px'; // Optional: rounded corners
            button.style.backgroundColor = '#007BFF'; // Optional: button color
            button.style.color = 'white'; // Optional: text color
            button.style.border = 'none'; // Optional: remove border
            button.style.cursor = 'pointer'; // Change cursor to pointer

            // Add an event listener to handle clicks on the button
            button.addEventListener('click', () => {
                history.pushState(null,null,routePathNames.LOADED);
                LoadedPageView(entry.name,entry.file);
            });

            historyContainer.appendChild(button); // Append the button to the history container
        });
    } else {
        const noHistoryMessage = document.createElement('div');
        noHistoryMessage.innerText = 'No chat history available.';
        historyContainer.appendChild(noHistoryMessage);
    }
}





// Initialize the chat loading when the page load