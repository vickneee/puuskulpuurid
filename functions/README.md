# Functions

Firebase Cloud Functions backend for the contact form.

## Available function

- `sendContactEmail` — sends a contact form email using Resend.

## Setup

1. Install dependencies:

```bash
cd functions
npm install
```

2. Set your Resend key:

```bash
firebase functions:config:set resend.api_key="YOUR_RESEND_API_KEY"
```

Or use Firebase params / environment as configured for your deployment workflow.

3. Replace the verified sender in `index.js`:

```js
from: "Contact Form <contact@yourdomain.com>"
```

4. Deploy:

```bash
firebase deploy --only functions
```

