import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeSignal = signal<Theme>('system');
  private readonly systemThemeSignal = signal<'light' | 'dark'>('light');

  // Computed signal that returns the actual theme to use
  readonly currentTheme = computed(() => {
    const theme = this.themeSignal();
    if (theme === 'system') {
      return this.systemThemeSignal();
    }
    return theme;
  });

  // Computed signal for CSS class
  readonly themeClass = computed(() => {
    const theme = this.currentTheme();
    return theme === 'dark' ? 'dark-theme' : 'light-theme';
  });

  constructor() {
    // Initialize system theme
    this.updateSystemTheme();

    // Effect to apply theme whenever currentTheme changes
    effect(() => {
      const theme = this.currentTheme();
      this.applyThemeToDOM(theme);
    });
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }

  toggleTheme(): void {
    const current = this.themeSignal();
    if (current === 'light') {
      this.setTheme('dark');
    } else if (current === 'dark') {
      this.setTheme('system');
    } else {
      this.setTheme('light');
    }
  }

  private applyThemeToDOM(theme: 'light' | 'dark'): void {
    // Remove existing theme classes
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    // Add the new theme class
    document.documentElement.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
  }

  private updateSystemTheme(): void {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.systemThemeSignal.set(isDark ? 'dark' : 'light');
  }

  // Initialize theme from localStorage or system preference
  initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.themeSignal.set(savedTheme);
    } else {
      this.themeSignal.set('system');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.updateSystemTheme();
    });
  }
}
