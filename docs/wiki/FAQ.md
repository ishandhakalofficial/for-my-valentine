# FAQ & Troubleshooting ❓

Here are some common questions and issues you might encounter.

## ❓ I sent the link, but it's not personalized.
**Check the URL:** Ensure the name parameters are present in the URL. It should look like this:
`https://yourusername.github.io/for-my-valentine/?v=PartnerName&y=YourName`

## ❓ The "Vibe Match" score is always the same.
**That's intentional!** The score is calculated based on the first letters of the names provided. It creates a "consistent destiny" for each pair. If you want it to be random, check out the [Customization Guide](Customization).

## ❓ How do I see the responses without Formspree?
If you didn't set up email notifications, you can still find the data:
1.  Open the browser console (`F12` or `Right Click` > `Inspect` > `Console`).
2.  Type `getResponses()` and press Enter.
3.  It will output an array of all proposals completed on *that specific browser*.

## ❓ The animations are laggy.
This project uses CSS transitions and glassmorphism, which can be heavy on older devices. Try disabling some background effects in the CSS if you need better performance.

---
[Back to Home](Home)
