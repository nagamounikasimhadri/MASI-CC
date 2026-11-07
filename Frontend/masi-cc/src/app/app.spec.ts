import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain("Welcome to MASI'S CC");
  });

  it('should toggle the theme and remember it', async () => {
    localStorage.removeItem('theme');
    delete document.documentElement.dataset['theme'];
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.theme-toggle',
    )!;
    expect(button.getAttribute('aria-label')).toBe('Switch to dark mode');

    button.click();
    await fixture.whenStable();

    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(button.getAttribute('aria-label')).toBe('Switch to light mode');
  });
});
