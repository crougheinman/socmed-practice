import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { SignIn } from './sign-in/sign-in';
import { WelcomePage } from './welcome-page/welcome-page';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Dashboard, SignIn, WelcomePage],
  exports: [Dashboard, SignIn, WelcomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
