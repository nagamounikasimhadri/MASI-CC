import { Service, signal } from '@angular/core';

export interface RegistrationRecord {
  firstName: string;
  lastName: string;
  emailId: string;
  telePhone: string;
  addressBook: string;
}
@Service()
export class Registration {
  private readonly records = signal<RegistrationRecord[]>([]);

  addRegistration(record: RegistrationRecord) {
    this.records.update((records) => [...records, { ...record }]);
  }
  getAllRegistrations(): RegistrationRecord[] {
    return this.records().map((record) => ({ ...record }));
  }

  getRegistrationsByEmail(email: string): RegistrationRecord[] {
    const normalizedEmail = email.trim().toLowerCase();

    return this.getAllRegistrations().filter(
      (record) => record.emailId.trim().toLowerCase() === normalizedEmail,
    );
  }
}
