import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  kitchenName = "Mounika's Cloud Kitchen";
  protected readonly title = signal('masi-cc');

  private readonly root = inject(DOCUMENT).documentElement;
  // The inline script in index.html picks the starting theme before first paint.
  protected readonly isDark = signal(this.root.dataset['theme'] === 'dark');

  protected toggleTheme() {
    const theme = this.isDark() ? 'light' : 'dark';
    this.isDark.set(theme === 'dark');
    this.root.dataset['theme'] = theme;
    localStorage.setItem('theme', theme);
  }
}
