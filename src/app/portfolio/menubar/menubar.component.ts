import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {
  @ViewChild('linksContainer') linksContainer!: ElementRef;

  widthWin = window.innerWidth;

  constructor(@Inject(DOCUMENT) private document: Document, public translate: TranslateService, private router: Router) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('de');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang && ['de', 'en'].includes(browserLang) ? browserLang : 'de');
  }

  // scrollTo(sectionId: string) {
  //   const element = this.document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }

  scrollToOrNavigate(sectionId: string) {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); 
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  openBurgerMenu() {
    const el = this.linksContainer.nativeElement;

    if (this.widthWin < 1024 && el.style.display === 'flex') {
      console.log(this.widthWin < 1024);

      el.style.display = 'none';
    } else {
      el.style.display = 'flex';
    }
  }

  closeBurgerMenu() {
    const el = this.linksContainer.nativeElement;

    if (this.widthWin < 1024 && el) {
      el.style.display = "none";
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
