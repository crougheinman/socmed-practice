# Socmed Practice - Sign In Setup

## Firebase Configuration

To enable sign-in functionality, you need to configure Firebase:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one

### 2. Enable Authentication

1. In your Firebase project, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** and **Google** providers

### 3. Configure Firestore (Optional)

If you plan to use Firestore for data storage:

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** for development

### 4. Update Configuration

1. Open `src/environments/firebase.config.ts`
2. Replace the placeholder values with your Firebase project config
3. You can find these values in your Firebase project settings

### 5. Firebase Config Values

```typescript
export const firebaseConfig = {
  apiKey: 'your-actual-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-actual-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: 'your-actual-app-id',
};
```

## Features Implemented

- ✅ Email/Password authentication
- ✅ Google Sign-In
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive Material Design UI
- ✅ Navigation after successful sign-in

## Usage

1. Run `npm start`
2. Navigate to the sign-in page
3. Use email/password or Google sign-in
4. After successful authentication, you'll be redirected to the main app

## Next Steps

- Add user profile management
- Implement sign-up functionality
- Add password reset
- Configure protected routes
- Add user session persistence
