import { Service, signal } from '@angular/core';

export interface DemoSession {
  role: 'admin' | 'user';
  email: string;
}

// Frontend demonstration only. The backend will authenticate real accounts later.
@Service()
export class DemoAuth {
  private readonly currentSession = signal<DemoSession | null>(null);
  readonly session = this.currentSession.asReadonly();

  login(role: DemoSession['role'], email: string) {
    this.currentSession.set({ role, email: email.trim().toLowerCase() });
  }

  logout() {
    this.currentSession.set(null);
  }
}
