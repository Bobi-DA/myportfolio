import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  isChecked: boolean = false;

  namePlaceholder = "Your name";
  emailPlaceholder = "Your e-mail";
  messagePlaceholder = "Your message";

  ngOnInit() {
    console.log('Initialwert:', this.isChecked);
  }

  onNameFocus(input: string) {
    console.log(input);

    if (input == "name") {
      this.namePlaceholder = 'Dein Name';
    }
    if (input == "email") {
      this.emailPlaceholder = 'Deine E-Mail-Adresse';
    }
  }

  onNameBlur(nameInput: NgModel) {
    // if (!nameInput.valid && nameInput.touched) {
    //   this.namePlaceholder = 'Bitte geben Sie einen Namen ein';
    // } else {
    //   this.namePlaceholder = 'Dein Name';
    // }

    {
      this.namePlaceholder = !nameInput.valid && nameInput.touched ? 'Bitte geben Sie einen Namen ein' : 'Your name';
    }
  }

  onEmailBlur(emailInput: NgModel) {
    if (!emailInput.valid && emailInput.touched) {
      this.emailPlaceholder = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    } else {
      this.emailPlaceholder = 'Deine E-Mail';
    }
  }

  scrollTo() {
    const element = document.getElementById('landingpage');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
