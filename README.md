# Roshith Biju — Portfolio

Static portfolio website (HTML, CSS, JS). Open `index.html` or host on GitHub Pages / any static host.

## Receive contact-form messages on WhatsApp (no redirect)

The form posts the enquiry straight to the owner's WhatsApp via the free CallMeBot API.

1. Follow https://www.callmebot.com/blog/free-api-whatsapp-messages/ once with number 919539037946 to get an **API key**.
2. Put the key in `main.js`: `var CFG={phone:RAW,key:'YOUR_KEY'};`
3. Commit and push. Visitors now stay on the site and see a "Message sent" popup.

Without a key the form falls back to opening WhatsApp with the message prefilled.
