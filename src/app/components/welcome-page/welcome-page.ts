import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { WelcomePageFacade, WelcomePageFacadeModel } from './welcome-page.facade';

@Component({
  selector: 'app-welcome-page',
  imports: [CommonModule, RouterModule],
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

  onToggleFeatures(): void {
    this.facade.toggleFeatures();
  }
}
