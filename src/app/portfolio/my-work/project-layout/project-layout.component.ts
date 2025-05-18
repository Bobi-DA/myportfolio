import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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

export class ProjectLayoutComponent {

  screenWidth: number = window.innerWidth;
  projects: Project[] = [];
  

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.loadProjects();
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
    this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });
  }

  loadProjects() {
    this.translate.get('PROJECTS').subscribe((data) => {
      this.projects = data;
    });
  }


  toggleExpanded(p: Project) {
    
    p.expanded = !p.expanded;
  }

  openLinkInNewTab(url: string){
    window.open(url, '_blank');
  }

}
