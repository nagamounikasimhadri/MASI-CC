import { Component,inject } from '@angular/core';
import { Registration } from '../services/registration';
import { ReactiveFormsModule, FormGroup,FormControl, Validators } from '@angular/forms';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private registrationService = inject(Registration);
  registrationForm = new FormGroup({
  firstName: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
  lastName: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  }),
  emailId: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  }),
  telePhone: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]
  }),
  addressBook: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })  
  });
 submitted = false;
  onSubmit()
  {
    if(this.registrationForm.invalid)
    {
      this.registrationForm.markAllAsTouched();
      return;
    }
    const record = this.registrationForm.getRawValue();
  this.registrationService.addRegistration(record);
    this.submitted = true;
    console.log(this.registrationForm.value);
  }

  registerAnother()
  {
    this.registrationForm.reset();
    this.submitted=false;
  }
}
