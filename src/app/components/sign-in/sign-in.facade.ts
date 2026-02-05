import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  AuthErrorCodes,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
import { AppState, setAuthenticatedUser } from '@app/store';
import { User } from '@models';

export interface SignInFacadeModel {
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: SignInFacadeModel = {
  isLoading: false,
  errorMessage: null,
};

@Injectable()
export class SignInFacade {
  vm$: Observable<SignInFacadeModel>;

  private isLoading$ = new BehaviorSubject<boolean>(false);
  private errorMessage$ = new BehaviorSubject<string | null>(null);
  private googleAuthProvider = new GoogleAuthProvider();

  constructor(
    private auth: Auth,
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.vm$ = this.buildViewModel();
  }

  private buildViewModel(): Observable<SignInFacadeModel> {
    return combineLatest([
      this.isLoading$.asObservable().pipe(distinctUntilChanged()),
      this.errorMessage$.asObservable().pipe(distinctUntilChanged()),
    ]).pipe(
      map(([isLoading, errorMessage]) => ({
        isLoading,
        errorMessage,
      })),
    );
  }

  async signInWithEmail(email: string, password: string): Promise<void> {
    this.errorMessage$.next(null);
    this.isLoading$.next(true);

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Dispatch user to store
      this.store.dispatch(
        setAuthenticatedUser({
          user: {
            email: user.email || '',
            id: user.uid,
            uid: user.uid,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            phoneNumber: user.phoneNumber || '',
            providerId: user.providerData[0]?.providerId || '',
          } as User,
        }),
      );

      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Sign-in error:', error);
      this.handleAuthError(error);
    } finally {
      this.isLoading$.next(false);
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.errorMessage$.next(null);
    this.isLoading$.next(true);

    try {
      const userCredential = await signInWithPopup(this.auth, this.googleAuthProvider);
      const user = userCredential.user;

      // Dispatch user to store
      this.store.dispatch(
        setAuthenticatedUser({
          user: {
            email: user.email || '',
            id: user.uid,
            uid: user.uid,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            phoneNumber: user.phoneNumber || '',
            providerId: user.providerData[0]?.providerId || '',
          } as User,
        }),
      );

      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      this.errorMessage$.next('Failed to sign in with Google. Please try again.');
    } finally {
      this.isLoading$.next(false);
    }
  }

  private handleAuthError(error: any): void {
    const errorMessage = error.message || '';

    if (errorMessage.includes(AuthErrorCodes.USER_DELETED)) {
      this.errorMessage$.next('User not found. Please check your email.');
    } else if (errorMessage.includes(AuthErrorCodes.INVALID_PASSWORD)) {
      this.errorMessage$.next('Invalid password. Please try again.');
    } else if (errorMessage.includes(AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER)) {
      this.errorMessage$.next('Too many attempts. Please try again later.');
    } else if (errorMessage.includes(AuthErrorCodes.OPERATION_NOT_ALLOWED)) {
      this.errorMessage$.next('Operation not allowed. Please contact support.');
    } else if (errorMessage.includes(AuthErrorCodes.INTERNAL_ERROR)) {
      this.errorMessage$.next('Internal error. Please try again later.');
    } else if (errorMessage.includes(AuthErrorCodes.INVALID_EMAIL)) {
      this.errorMessage$.next('Invalid email format. Please check your email.');
    } else {
      this.errorMessage$.next('An error occurred during sign-in. Please try again.');
    }
  }
}
