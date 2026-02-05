import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, selectAuthenticatedUser } from '@app/store';
import { Store } from '@ngrx/store';
import { User } from '@models';
import { combineLatest, map, Observable, of } from 'rxjs';

export interface WelcomePageFacadeModel {
  welcomeMessage: string;
  features: string[];
  showFeatures: boolean;
  user: User | null;
}

export const initialState: WelcomePageFacadeModel = {
  welcomeMessage: 'Welcome!',
  features: [],
  showFeatures: true,
  user: null,
};

@Injectable()
export class WelcomePageFacade {
  vm$: Observable<WelcomePageFacadeModel> = of(initialState);

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.vm$ = this.buildViewModel();
  }

  private buildViewModel(): Observable<WelcomePageFacadeModel> {
    return combineLatest([this.store.select(selectAuthenticatedUser)]).pipe(
      map(([user]) => ({
        welcomeMessage: this.getWelcomeMessage(),
        features: this.getFeaturesList(),
        showFeatures: true,
        user,
      })),
    );
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
