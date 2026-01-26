// Firebase configuration
// Replace these values with your Firebase project configuration
export const firebaseConfig = {
  projectId: import.meta.env['NG_APP_FIREBASE_PROJECT_ID'],
  appId: import.meta.env['NG_APP_FIREBASE_APP_ID'],
  storageBucket: import.meta.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
  apiKey: import.meta.env['NG_APP_FIREBASE_API_KEY'],
  authDomain: import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
  messagingSenderId: import.meta.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
};
