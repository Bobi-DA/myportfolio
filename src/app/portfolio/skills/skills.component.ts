import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  @ViewChildren('animatedSection', { read: ElementRef }) sections!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible'); 
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    this.sections.forEach(section => {
      observer.observe(section.nativeElement);
    });
  }

  scrollTo() {
    const element = document.getElementById('myWork');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
