# Email Notifications (Formspree) 📧

Since "For My Valentine" is a static project (it doesn't have a backend), you can use a free service like **Formspree** to receive form submissions directly in your email.

## ⚙️ How to Setup Formspree

1.  **Create an Account:** Go to [Formspree.io](https://formspree.io/) and sign up for a free account.
2.  **Create a New Form:**
    -   Click "New Form".
    -   Name it something like "Valentine App Responses".
    -   Set the recipient email (where you want the "Yes!" to go).
3.  **Get Your Endpoint:**
    -   Once created, you'll see a unique URL like `https://formspree.io/f/mqp_example_id`.
    -   **Copy this URL.**

## 💻 Integration in Code

1.  Open [js/responses.js](file:///home/devid-shane/ProjectsX/for-my-valentine/js/responses.js).
2.  Find the line where `EMAIL_ENDPOINT` is defined:
    ```javascript
    const EMAIL_ENDPOINT = ""; // Paste your Formspree URL here
    ```
3.  Paste your endpoint between the quotes:
    ```javascript
    const EMAIL_ENDPOINT = "https://formspree.io/f/mqp_example_id"; 
    ```
4.  **Save and Deploy.**

## 🧪 Testing

1.  Open your live site.
2.  Navigate through the proposal as if you were your Valentine.
3.  Complete the "Officialize" step.
4.  Check your email! You should receive a summary of the date plan.

---
[Next: FAQ & Troubleshooting](FAQ)
