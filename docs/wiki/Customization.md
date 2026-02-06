# Customization Guide 🎨

Want to make the app even more personal? Here's how you can tweak the code to fit your style.

## 🌈 Changing the Theme & Colors

The project uses CSS variables for colors. You can find these at the top of the `<style>` block in `index.html`.

```css
:root {
  --primary: #ff4d6d;
  --secondary: #ff85a1;
  --background: #fff0f3;
  /* Add or change colors here */
}
```

## ✍️ Modifying Text & Messages

Most of the strings (like greetings or "match" messages) are located in `js/app.js`. Search for the `updateUI()` function or `vibeCheck()` to change the hardcoded strings.

## 🕹 Changing the Vibe Match Logic

The compatibility calculator is in `js/app.js`. Currently, it uses the sum of character codes of the first letters. You can modify this to be more random or use different criteria.

```javascript
function calculateScore(v, y) {
  // Current logic: simple char code based
  // You can change this to anything you like!
}
```

## 📅 Adding More Date Options

To add more food types or locations to the planner:
1.  Open `index.html`.
2.  Find the section with `id="date-planner"`.
3.  Add new buttons or select options with appropriate classes and data attributes.

---
[Next: Email Notifications](Email-Notifications)
