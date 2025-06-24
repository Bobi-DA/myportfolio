// import { NgFor, NgIf } from '@angular/common';
// import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   technologies: string;
//   learned: string;
//   screenshot: string;
//   liveUrl?: string;
//   githubUrl: string;
//   expanded?: boolean;
// }

// @Component({
//   selector: 'app-project-layout',
//   standalone: true,
//   imports: [NgFor, NgIf, TranslateModule],
//   templateUrl: './project-layout.component.html',
//   styleUrl: './project-layout.component.scss'
// })

// export class ProjectLayoutComponent {
//   @ViewChildren('animatedSection', { read: ElementRef }) sections!: QueryList<ElementRef>;
//   constructor(private translate: TranslateService) { }

//   screenWidth: number = window.innerWidth;
//   projects: Project[] = [];


//   ngAfterViewInit() {
//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//           } else {
//             entry.target.classList.remove('visible'); // Klasse entfernen, damit Animation erneut ablaufen kann
//           }
//         });
//       },
//       {
//         threshold: 0.5,
//       }
//     );

//     this.sections.forEach(section => {
//       observer.observe(section.nativeElement);
//     });
//   }

//   ngOnInit() {
//     this.loadProjects();
//     window.addEventListener('resize', () => {
//       this.screenWidth = window.innerWidth;
//     });
//     this.translate.onLangChange.subscribe(() => {
//       this.loadProjects();
//     });
//   }

//   loadProjects() {
//     this.translate.get('PROJECTS').subscribe((data) => {
//       this.projects = data;
//     });
//   }


//   toggleExpanded(p: Project) {

//     p.expanded = !p.expanded;
//   }

//   openLinkInNewTab(url: string) {
//     window.open(url, '_blank');
//   }

// }


import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  learned: string;
  screenshot: string;
  liveUrl?: string;
  githubUrl: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-project-layout',
  standalone: true,
  imports: [NgFor, NgIf, TranslateModule],
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.scss'
})
export class ProjectLayoutComponent implements AfterViewInit, OnInit {
  @ViewChildren('animatedSection', { read: ElementRef })
  sections!: QueryList<ElementRef>;

  screenWidth = window.innerWidth;
  projects: Project[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadProjects();
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
    this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });
  }

  private loadProjects() {
    this.translate.get('PROJECTS').subscribe((data) => {
      this.projects = data;
    });
  }

  ngAfterViewInit() {
    // Wenn die Liste sich ändert (z.B. Projekte asynchron geladen), Observer neu ansetzen
    this.sections.changes.subscribe(() => this.observeSections());
    // Initial einmal setzen, falls schon Sections da sind
    this.observeSections();
  }

  private observeSections() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('visible');
          } else {
            el.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    this.sections.forEach((section) => {
      observer.observe(section.nativeElement);
    });
  }

  toggleExpanded(p: Project) {
    p.expanded = !p.expanded;
  }

  openLinkInNewTab(url: string) {
    window.open(url, '_blank');
  }
}
