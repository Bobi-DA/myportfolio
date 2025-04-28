import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MenubarComponent } from "./menubar/menubar.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { WhyMeComponent } from "./why-me/why-me.component";
import { SkillsComponent } from "./skills/skills.component";
import { MyWorkComponent } from "./my-work/my-work.component";
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [MenubarComponent, LandingpageComponent, WhyMeComponent, SkillsComponent, MyWorkComponent, ContactComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})


export class PortfolioComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngAfterViewInit() {
    // Nur wenn die Bildschirmbreite größer als 1024px ist
    if (window.innerWidth > 1024) {
      const container = this.scrollContainer.nativeElement;

      container.addEventListener('wheel', (event: WheelEvent) => {
        
        if (event.deltaY !== 0) {
          event.preventDefault(); // normales vertikales Scrollen blockieren
          container.scrollLeft += event.deltaY; // horizontal scrollen
        }
      }, { passive: false });
    }
  }
}


