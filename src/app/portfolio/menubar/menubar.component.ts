import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  scrollTo(sectionId: string) {
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // this.closeBurgerMenu(); // danach Menü schließen
  }


  @ViewChild('linksContainer') linksContainer!: ElementRef;

  openBurgerMenu() {
    const el = this.linksContainer.nativeElement;

    if (el.style.display === 'flex') {
      el.style.display = 'none';
    } else {
      el.style.display = 'flex';
    }
  }


  closeBurgerMenu() {
    const el = this.linksContainer.nativeElement;

    if (el) {
      el.style.display = "none";
    }
  }
}
