import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { WelcomePageFacade, WelcomePageFacadeModel } from './welcome-page.facade';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-welcome-page',
  imports: [
    CommonModule,
    RouterModule,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardActions,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatIcon,
    MatChip,
  ],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
  providers: [WelcomePageFacade],
})
export class WelcomePage {
  vm$: Observable<WelcomePageFacadeModel>;

  constructor(private facade: WelcomePageFacade) {
    this.vm$ = this.facade.vm$;
  }

  onSignInClick(): void {
    this.facade.navigateToSignIn();
  }

  onDashboardClick(): void {
    this.facade.navigateToDashboard();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'baking':
        return 'warn';
      case 'preparing':
        return 'accent';
      case 'ready':
        return 'primary';
      default:
        return 'basic';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'baking':
        return 'Baking';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      default:
        return 'Unknown';
    }
  }

  onToggleFeatures(): void {
    this.facade.toggleFeatures();
  }
}
