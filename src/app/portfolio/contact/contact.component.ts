import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LangChangeEvent, TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, FooterComponent, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})

export class ContactComponent {
  @ViewChildren('animatedSection', { read: ElementRef }) sections!: QueryList<ElementRef>;

  isChecked: boolean = false;
  successMessage: string = '';

  namePlaceholder = '';
  emailPlaceholder = '';
  messagePlaceholder = '';
  emailErrorMessage: string = '';

  private langChangeSubscription!: Subscription;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.updatePlaceholders();

    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updatePlaceholders();
    });
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    this.sections.forEach(section => {
      observer.observe(section.nativeElement);
    });
  }

  updatePlaceholders() {
    this.translate.get(['YOURNAME', 'YOUREMAIL', 'ENTERMESSAGE']).subscribe(translations => {
      this.namePlaceholder = translations['YOURNAME'];
      this.emailPlaceholder = translations['YOUREMAIL'];
      this.messagePlaceholder = translations['ENTERMESSAGE'];
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  onNameFocus(input: string) {
    if (input === 'name') {
      this.translate.get('ENTERNAME').subscribe((translated: string) => {
        this.namePlaceholder = translated;
      });
    }
    if (input === 'email') {
      this.translate.get('ENTEREMAIL').subscribe((translated: string) => {
        this.emailPlaceholder = translated;
      });
    }
    if (input === 'message') {
      this.translate.get('ENTERMESSAGE').subscribe((translated: string) => {
        this.messagePlaceholder = translated;
      });
    }
  }

  onNameBlur(nameInput: NgModel) {
    if (!nameInput.valid && nameInput.touched) {
      this.translate.get('ENTERNAME1').subscribe((translated: string) => {
        this.namePlaceholder = translated;
      });
    }
  }

  onEmailBlur(emailInput: NgModel) {
    if (!emailInput.valid && emailInput.touched) {
      this.translate.get('ENTEREMAIL').subscribe((translated: string) => {
        this.emailErrorMessage = translated;
      });
    } else {
      this.emailErrorMessage = '';
    }
  }

  onMessageBlur(messageInput: NgModel) {
    if (!messageInput.valid && messageInput.touched) {
      this.translate.get('ENTERMESSAGE').subscribe((translated: string) => {
        this.messagePlaceholder = translated;
      });
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
            this.successMessage = this.translate.instant('FORM_SUCCESS');
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
