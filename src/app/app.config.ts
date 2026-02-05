import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { isDevMode } from '@angular/core';

import { routes } from './app.routes';

import { firebaseConfig } from '../environments/firebase.config';
import { AUTH_FEATURE_KEY, authReducer } from './store';
import { AuthGuard } from './auth-guard';
import { IsAuthenticatedGuard } from './is-auth-guard';
import { AuthEffects } from './store/state/auth/auth.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthGuard,
    IsAuthenticatedGuard,
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStore({
      [AUTH_FEATURE_KEY]: authReducer,
    }), // ✅ Added: Root store provider
    provideEffects([AuthEffects]), // ✅ Added: Effects provider
    provideStoreDevtools({
      // ✅ Added: DevTools for development
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
