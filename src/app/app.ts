import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from './theme.service';
import { Store } from '@ngrx/store';
import { AppState, signOut } from '@store';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbar, MatButton, MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Carhives');
  protected readonly store = inject(Store<AppState>);
  protected readonly auth = inject(Auth);

  private themeService = inject(ThemeService);

  // Expose theme service signals to template
  protected readonly currentTheme = this.themeService.currentTheme;
  protected readonly themeClass = this.themeService.themeClass;

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }

  protected toggleTheme(): void {
    console.log('Before toggle:', this.themeService.currentTheme());
    this.themeService.toggleTheme();
    console.log('After toggle:', this.themeService.currentTheme());
    console.log('HTML classes:', document.documentElement.className);
  }

  protected getThemeIcon(): string {
    const theme = this.currentTheme();
    switch (theme) {
      case 'light':
        return 'light_mode';
      case 'dark':
        return 'dark_mode';
      default:
        return 'brightness_auto';
    }
  }

  protected signOut(): void {
    this.auth.signOut();
    this.store.dispatch(signOut());
  }
}
