import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.scss'
})

export class DatenschutzComponent {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('de');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang && ['de', 'en'].includes(browserLang) ? browserLang : 'de');
  }

  ngOnInit(): void {
    const language = localStorage.getItem('language');

    if (language) {
      this.translate.use(language);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang?.match(/de|en/) ? browserLang : 'de');
    }
  }
}
