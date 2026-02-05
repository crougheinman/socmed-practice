import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { AppState, selectAuthenticatedUser } from '@store';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from '@models';
import { CommonModule } from '@angular/common';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatDivider,
    CommonModule,
    MatMenuItem,
    MatListModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal(import.meta.env['NG_APP_TITLE'] || 'TEMP');
  protected readonly store = inject(Store<AppState>);
  protected readonly auth = inject(Auth);
  protected readonly authService = inject(AuthService);
  protected readonly user$: Observable<User | null> = this.store.select(selectAuthenticatedUser);

  protected async signOut(): Promise<void> {
    await this.auth.signOut();
    await this.authService.logout();
  }
}
