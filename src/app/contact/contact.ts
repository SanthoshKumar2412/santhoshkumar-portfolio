import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  contactForm;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    // ✅ Form initialized AFTER fb is available
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log(this.contactForm.value);

    // backend later
    // this.http.post('http://localhost:8080/api/contact', this.contactForm.value).subscribe();

    this.contactForm.reset();
  }
}
