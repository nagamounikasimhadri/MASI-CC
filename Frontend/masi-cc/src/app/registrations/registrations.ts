import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DemoAuth } from '../services/demo-auth';
import { Registration } from '../services/registration';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registrations',
  styleUrl: './registrations.css',
  templateUrl: './registrations.html',
})
export class Registrations {
  private readonly registrationService = inject(Registration);
  private readonly auth = inject(DemoAuth);
  readonly session = this.auth.session;
  readonly loginError = signal('');

  readonly loginForm = new FormGroup({
    role: new FormControl<'user' | 'admin'>('user', { nonNullable: true }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  // Recalculate when the shared session or registration records change.
  readonly visibleRecords = computed(() => {
    const session = this.session();
    if (!session) return [];
    return session.role === 'admin'
      ? this.registrationService.getAllRegistrations()
      : this.registrationService.getRegistrationsByEmail(session.email);
  });

  login() {
    this.loginError.set('');
    const { role, email } = this.loginForm.getRawValue();
    if (role === 'user') {
      this.loginForm.controls.email.markAsTouched();
      if (this.loginForm.controls.email.invalid) return;
      if (this.registrationService.getRegistrationsByEmail(email).length === 0) {
        this.loginError.set('No registration matches this email. Register first, then try again.');
        return;
      }
    }
    this.auth.login(role, role === 'admin' ? '' : email);
    this.loginForm.reset();
  }

  logout() {
    this.auth.logout();
    this.loginForm.reset();
    this.loginError.set('');
  }
}
