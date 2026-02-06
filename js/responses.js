/**
 * Handles saving responses to LocalStorage and exporting data.
 */

const STORAGE_KEY = 'valentine_responses';

/**
 * FORMspree CONFIGURATION
 * To receive email notifications:
 * 1. Sign up at https://formspree.io/
 * 2. Create a form and copy the "Endpoint" URL
 * 3. Paste it here:
 */
const EMAIL_ENDPOINT = "https://formspree.io/f/xvzbpyak"; // Example: "https://formspree.io/f/your_form_id"

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

        // Also try to send email if endpoint is configured
        if (EMAIL_ENDPOINT) {
            sendEmailResponse(data);
        }
    } catch (e) {
        console.error("Failed to save to localStorage", e);
    }
}

/**
 * Sends response data to an email via Formspree.
 */
async function sendEmailResponse(data) {
    try {
        const response = await fetch(EMAIL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                subject: `New Valentine Date Plan from ${data.sender || 'Unknown'}`,
                ...data
            })
        });

        if (response.ok) {
            console.log("Email notification sent successfully!");
        } else {
            console.error("Failed to send email notification.");
        }
    } catch (e) {
        console.error("Error sending email:", e);
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
Message: ${data.message || 'None'}

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
