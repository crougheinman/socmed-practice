import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export interface WelcomePageFacadeModel {
  welcomeMessage: string;
  features: string[];
  showFeatures: boolean;
}

export const initialState: WelcomePageFacadeModel = {
  welcomeMessage: 'Welcome!',
  features: [],
  showFeatures: true,
};

@Injectable()
export class WelcomePageFacade {
  vm$: Observable<WelcomePageFacadeModel> = of(initialState);

  constructor(private router: Router) {
    this.vm$ = this.buildViewModel();
  }

  private buildViewModel(): Observable<WelcomePageFacadeModel> {
    const welcomeMessage = this.getWelcomeMessage();
    const features = this.getFeaturesList();

    return of({
      welcomeMessage,
      features,
      showFeatures: true,
    });
  }

  navigateToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  toggleFeatures(): void {
    // This would be implemented with BehaviorSubject if we needed reactive updates
    console.log('Toggle features visibility');
  }

  private getWelcomeMessage(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 18) return 'Good afternoon!';
    return 'Good evening!';
  }

  private getFeaturesList(): string[] {
    return [
      'Secure authentication with Firebase',
      'Real-time data synchronization',
      'Responsive design for all devices',
      'State management with NgRx',
      'Material Design components',
    ];
  }
}
