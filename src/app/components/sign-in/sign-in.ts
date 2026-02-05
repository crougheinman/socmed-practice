import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { ReactiveFormsModule } from '@angular/forms';
import { SignInFacade, SignInFacadeModel } from './sign-in.facade';
import { Observable } from 'rxjs';

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
  providers: [SignInFacade],
})
export class SignIn {
  vm$: Observable<SignInFacadeModel>;
  signInForm!: FormGroup;

  constructor(private facade: SignInFacade) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false),
    });

    this.vm$ = this.facade.vm$;
  }

  async onSignIn(): Promise<void> {
    if (this.signInForm.invalid) {
      return;
    }

    const { email, password } = this.signInForm.value;
    await this.facade.signInWithEmail(email, password);
  }

  async onSignInWithGoogle(): Promise<void> {
    await this.facade.signInWithGoogle();
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
