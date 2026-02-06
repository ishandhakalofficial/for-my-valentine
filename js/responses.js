/**
 * Handles saving responses to LocalStorage and exporting data.
 */

const STORAGE_KEY = 'valentine_responses';

/**
 * Saves a new response object to LocalStorage.
 * @param {Object} data - The response data to save.
 */
function saveResponse(data) {
    try {
        const history = getResponses();
        history.push(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        console.log("Response saved locally!", data);
    } catch (e) {
        console.error("Failed to save to localStorage", e);
    }
}

/**
 * Retrieves all saved responses.
 * @returns {Array} List of saved response objects.
 */
function getResponses() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to parse localStorage data", e);
        return [];
    }
}

/**
 * Downloads a text file with the response details.
 * Used as a fallback or for manual sharing.
 */
function downloadResponseFile(data) {
    const txt = `❤️ Valentine Date Plan ❤️

Sender: ${data.sender || 'Unknown'}
Receiver: ${data.receiver || 'Unknown'}
Date: ${data.date}
Place: ${data.place}
Food: ${data.food}
Movie: ${data.movie}

-- Vibe Check --
Match Percentage: ${data.vibeCheck.matchPercent}%
Fav Color: ${data.vibeCheck.favColor}
Fav Food: ${data.vibeCheck.favFood}
Fav Place: ${data.vibeCheck.favPlace}
Sea/Mt: ${data.vibeCheck.seaOrMt}
Fav Movie: ${data.vibeCheck.favMovie}
Fav Song: ${data.vibeCheck.favSong}
Coffee/Tea: ${data.vibeCheck.coffeeOrTea}

Timestamp: ${data.timestamp}
`;

    const blob = new Blob([txt], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Valentine_Plan_${(data.receiver || 'Love').replace(/ /g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
