// import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})

export class LandingpageComponent implements OnInit {

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

  scrollTo() {
    console.log("click");
    const element = document.getElementById('whyMe');
    console.log(element);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem("language", lang);
  }

  // goToLink(url: string) {
  //   window.open(url, "_blank");
  // }
}


