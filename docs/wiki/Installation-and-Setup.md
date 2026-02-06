# Installation and Setup Guide 🛠

Setting up "For My Valentine" is straightforward! Since it's a pure front-end project (HTML/CSS/JS), you don't need any complex backend or database.

## 📥 Cloning the Repository

Start by cloning the project to your local machine:

```bash
git clone https://github.com/ishandhakalofficial/for-my-valentine.git
cd for-my-valentine
```

## 💻 Local Development

1.  **Open in Browser:** Simply open `index.html` in any modern web browser to see it in action.
2.  **Using a Local Server (Recommended):** To avoid some browser security restrictions (like CORS if you add features later), use a local server:
    -   If using **VS Code**, install the "Live Server" extension and click "Go Live".
    -   Alternatively, use Python: `python -m http.server 8000`.

## 🌐 Deploying to GitHub Pages

This project is perfectly suited for **GitHub Pages**.

1.  Push your code to a GitHub repository.
2.  Go to **Settings** > **Pages**.
3.  Under **Build and deployment**, set the source to `Deploy from a branch`.
4.  Select the `main` branch and `/root` folder, then click **Save**.
5.  Your site will be live at `https://yourusername.github.io/for-my-valentine/`.

## ⚙️ Project Structure

-   `index.html`: The markup and layout of the app.
-   `js/app.js`: Handles UI routing, animations, and name-parsing logic.
-   `js/responses.js`: Manages data saving and email notifications.

---
[Next: Customization Guide](Customization)
