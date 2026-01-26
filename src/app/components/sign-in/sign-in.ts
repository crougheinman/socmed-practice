import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  AuthErrorCodes,
} from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
    MatIcon,
    MatCheckbox,
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  signInForm!: FormGroup;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false),
    });
  }

  async onSignIn(): Promise<void> {
    if (this.signInForm.invalid) {
      return;
    }

    const { email, password } = this.signInForm.value;

    this.errorMessage.set(null);
    this.isLoading.set(true);

    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      // Navigate to main app after successful sign-in
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Sign-in error:', error);
      this.handleAuthError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async onSignInWithGoogle(): Promise<void> {
    this.errorMessage.set(null);
    this.isLoading.set(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      // Navigate to main app after successful sign-in
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      this.errorMessage.set('Failed to sign in with Google. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  private handleAuthError(error: any): void {
    const errorMessage = error.message || '';

    if (errorMessage.includes(AuthErrorCodes.USER_DELETED)) {
      this.errorMessage.set('User not found. Please check your email.');
    } else if (errorMessage.includes(AuthErrorCodes.INVALID_PASSWORD)) {
      this.errorMessage.set('Invalid password. Please try again.');
    } else if (errorMessage.includes(AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER)) {
      this.errorMessage.set('Too many attempts. Please try again later.');
    } else if (errorMessage.includes(AuthErrorCodes.OPERATION_NOT_ALLOWED)) {
      this.errorMessage.set('Operation not allowed. Please contact support.');
    } else if (errorMessage.includes(AuthErrorCodes.INTERNAL_ERROR)) {
      this.errorMessage.set('Internal error. Please try again later.');
    } else if (errorMessage.includes(AuthErrorCodes.INVALID_EMAIL)) {
      this.errorMessage.set('Invalid email format. Please check your email.');
    } else {
      this.errorMessage.set('An error occurred during sign-in. Please try again.');
    }
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
