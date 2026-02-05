import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of } from 'rxjs';
import { AppState, selectAuthenticatedUser } from '@app/store';

export interface DashboardFacadeModel {
  userId: string | undefined;
  userDisplayName: string;
}

export const initialState: DashboardFacadeModel = {
  userId: '',
  userDisplayName: 'User',
};

@Injectable()
export class DashboardFacade {
  vm$: Observable<DashboardFacadeModel> = of(initialState);

  constructor(private store: Store<AppState>) {
    this.vm$ = this.buildViewModel();
  }

  private buildViewModel(): Observable<DashboardFacadeModel> {
    return combineLatest([this.store.select(selectAuthenticatedUser)]).pipe(
      map(([user]) => {
        let userDisplayName = 'User';
        if (user?.displayName) {
          userDisplayName = user.displayName;
        } else if (user?.email) {
          userDisplayName = user.email.split('@')[0];
        }

        return {
          userId: user?.id,
          userDisplayName,
        };
      }),
    );
  }

  loadDashboardData(): void {
    // TODO: Implement dashboard data loading
    console.log('Loading dashboard data...');
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}
