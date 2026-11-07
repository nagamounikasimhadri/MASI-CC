import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registrations } from './registrations';
import { provideRouter } from '@angular/router';
import { Registration, RegistrationRecord } from '../services/registration';
import { DemoAuth } from '../services/demo-auth';

describe('Registrations', () => {
  let component: Registrations;
  let fixture: ComponentFixture<Registrations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registrations],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Registrations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function seedRecords() {
    const records: RegistrationRecord[] = [
      {
        firstName: 'Mounika',
        lastName: 'Simhadri',
        emailId: 'mounika@example.com',
        telePhone: '1234567890',
        addressBook: 'First Street',
      },
      {
        firstName: 'Another',
        lastName: 'User',
        emailId: 'another@example.com',
        telePhone: '9876543210',
        addressBook: 'Second Street',
      },
    ];
    records.forEach((record) => TestBed.inject(Registration).addRegistration(record));
    return records;
  }

  it('shows login without exposing records before a session exists', () => {
    seedRecords();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('table')).toBeNull();
    expect(component.visibleRecords()).toEqual([]);
  });

  it('shows only matching user records and hides other users in the table', () => {
    const records = seedRecords();
    component.loginForm.setValue({ role: 'user', email: 'MOUNIKA@example.com' });
    component.login();
    fixture.detectChanges();
    expect(component.visibleRecords()).toEqual([records[0]]);
    expect(fixture.nativeElement.querySelector('tbody').textContent).toContain('Mounika');
    expect(fixture.nativeElement.querySelector('tbody').textContent).not.toContain(
      'another@example.com',
    );
    expect(fixture.nativeElement.querySelector('form')).toBeNull();
  });

  it('shows all records for the demo admin, including newly added records', () => {
    const records = seedRecords();
    component.loginForm.controls.role.setValue('admin');
    component.login();
    expect(component.visibleRecords()).toEqual(records);
    TestBed.inject(Registration).addRegistration({ ...records[0], firstName: 'New record' });
    expect(component.visibleRecords().length).toBe(3);
  });

  it('rejects invalid and unregistered user emails', () => {
    component.loginForm.controls.email.setValue('invalid');
    component.login();
    expect(component.session()).toBeNull();
    component.loginForm.controls.email.setValue('missing@example.com');
    component.login();
    expect(component.session()).toBeNull();
    expect(component.loginError()).toContain('No registration matches');
  });

  it('keeps the session across component recreation and clears it on logout', () => {
    seedRecords();
    component.loginForm.controls.role.setValue('admin');
    component.login();
    fixture.destroy();
    fixture = TestBed.createComponent(Registrations);
    component = fixture.componentInstance;
    expect(component.session()?.role).toBe('admin');
    component.logout();
    fixture.detectChanges();
    expect(TestBed.inject(DemoAuth).session()).toBeNull();
    expect(component.visibleRecords()).toEqual([]);
    expect(fixture.nativeElement.querySelector('table')).toBeNull();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('shows an empty state to admins when no records exist', () => {
    component.loginForm.controls.role.setValue('admin');
    component.login();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.empty-state').textContent).toContain(
      'No registrations yet',
    );
  });
});
