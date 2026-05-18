# React + TypeScript + Vite

## Firebase-backed content

This app stores gallery images in **Firebase Storage** and gallery text/category data in **Firestore**.

### Required Firebase setup

1. Create a Firebase project.
2. Enable **Authentication** with Email/Password.
3. Create a Firestore database.
4. Create a Storage bucket.
5. Set the environment variables in `frontend/.env`.
6. Deploy the security rules:

```bash
cd frontend
firebase deploy --only firestore:rules,storage
```

7. Apply the Storage bucket CORS policy so browser uploads and downloads can talk to Firebase Storage without being blocked. This is required even when the app uses the Firebase SDK:

```bash
gsutil cors set storage-cors.json gs://YOUR_BUCKET_NAME
```

Replace `YOUR_BUCKET_NAME` with the exact bucket name from the Firebase console or your `.env` file. The repository includes a ready-to-use `storage-cors.json` file with permissive CORS settings for local development and admin uploads.

The provided rules allow:
- public reads for gallery content
- authenticated writes for admins

If you still see `Missing or insufficient permissions` or a browser CORS error after uploading, verify:
- you are signed in as an admin before saving
- `storage.rules` and `firestore.rules` have been deployed
- the bucket CORS policy was applied to the same bucket configured in `frontend/.env`

If the database is empty, the UI falls back to bundled starter content until you populate Firebase through the admin dashboard.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
