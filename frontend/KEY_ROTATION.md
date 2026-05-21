# Key rotation checklist

If any credential was exposed, rotate it in the source provider first, then update the app.

## Important note

The `VITE_` values used by the frontend are **public web configuration**, not private secrets.
They can live in the browser bundle, but they should still be kept out of Git unless you intentionally want them committed.
Real secrets belong only in backend secrets or local-only env files.

## 1) Firebase web config
The values in `frontend/.env` and `frontend/.env.production` are **public web config**, not private secrets.
Still, if you want a fresh set:

1. Open Firebase Console → Project settings → Your apps.
2. Create a new Web app or re-copy the current web config.
3. Update the values in your local `.env` files.

## 2) Contact form email credentials
If you use Gmail SMTP, Brevo, SendGrid, or another mail provider:

1. Revoke the old API key / app password in the provider dashboard.
2. Create a new one.
3. Store it in Firebase Secrets or your deployment environment.
4. Never commit it to GitHub.

## 3) Firebase Auth admin account
Admin login uses Firebase Authentication.
If you need a fresh admin login:

1. Create or update the admin user in Firebase Auth.
2. Reset the password if needed.
3. Sign in again from the admin page.

## 4) Local env files
Use the examples in the repo:

- `frontend/.env.example`
- `frontend/.env.production.example`

Copy them locally and fill in your own values.


