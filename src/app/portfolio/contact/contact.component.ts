import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  namePlaceholder = "Your name";

  onNameFocus() {
    this.namePlaceholder = 'Your name';
  }
  
  onNameBlur(nameInput: NgModel) {
    if (!nameInput.valid && nameInput.touched) {
      this.namePlaceholder = 'Bitte geben Sie einen Namen ein';
    } else {
      this.namePlaceholder = 'Your name';
    }
  }
  
  http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: ""
  }


  post = {
    endPoint: 'https://boban-jakovljevic.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {

            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid) {

      ngForm.resetForm();
    }
  }

}
