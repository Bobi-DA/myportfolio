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
export class PortfolioComponent {
  // @ViewChild('portfolioContainer') portfolioContainer!: ElementRef;

  // ngAfterViewInit() {
  //   const container = this.portfolioContainer.nativeElement;
    
  //   container.addEventListener('wheel', (event: WheelEvent) => {
  //     // Wenn vertikales Scrollen erkannt wird
  //   console.log('Wheel event deltaY:', event.deltaY); // Debug-Ausgabe

  //     if (event.deltaY !== 0) {
  //       event.preventDefault(); // Verhindert vertikales Scrollen
  //       container.scrollLeft += event.deltaY; // Scrollt horizontal
  //     }
  //   }, { passive: false });
  // }
}
