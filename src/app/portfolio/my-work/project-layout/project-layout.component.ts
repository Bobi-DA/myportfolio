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
    this.sections.changes.subscribe(() => this.observeSections());
    this.observeSections();
  }

  private observeSections() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('visible');
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
