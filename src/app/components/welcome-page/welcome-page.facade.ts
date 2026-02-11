import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, selectAuthenticatedUser } from '@app/store';
import { Store } from '@ngrx/store';
import { User, Order } from '@models';
import { combineLatest, map, Observable, of } from 'rxjs';

export interface WelcomePageFacadeModel {
  welcomeMessage: string;
  features: string[];
  showFeatures: boolean;
  user: User | null;
  orders: Order[];
}

export const initialState: WelcomePageFacadeModel = {
  welcomeMessage: 'Welcome!',
  features: [],
  showFeatures: true,
  user: null,
  orders: [],
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
        orders: this.getOrders(),
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

  private getOrders(): Order[] {
    return [
      {
        id: '1',
        orderNumber: '#1001',
        customerName: 'John Doe',
        items: '2x Chocolate Chip, 1x Oatmeal Raisin',
        timePlaced: 'Placed 15 mins ago',
        status: 'preparing',
        actionLabel: 'Mark Ready',
        actionIcon: 'check_circle',
      },
      {
        id: '2',
        orderNumber: '#1002',
        customerName: 'Jane Smith',
        items: '3x Peanut Butter, 1x Double Chocolate',
        timePlaced: 'Placed 8 mins ago',
        status: 'ready',
        actionLabel: 'Mark Delivered',
        actionIcon: 'local_shipping',
      },
      {
        id: '3',
        orderNumber: '#1003',
        customerName: 'Bob Johnson',
        items: '1x Sugar Cookie, 2x Macadamia Nut',
        timePlaced: 'Placed 22 mins ago',
        status: 'baking',
        actionLabel: 'Start Preparing',
        actionIcon: 'play_arrow',
      },
    ];
  }
}
