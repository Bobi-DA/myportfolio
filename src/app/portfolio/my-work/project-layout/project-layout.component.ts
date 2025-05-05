import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

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
  imports: [NgFor, NgIf],
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.scss'
})


export class ProjectLayoutComponent {

  screenWidth: number = window.innerWidth;

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }

  projects: Project[] = [
    {
      id: 1,
      title: 'Project Join',
      description: 'Aufgabenmanager nach dem Vorbild des Kanban-Systems. Erstellen und organisieren Sie Aufgaben mit Hilfe von Drag-and-Drop-Funktionen, weisen Sie Benutzer und Kategorien zu.',
      technologies: 'JavaScript, Firebase, HTML, CSS, Scrum',
      learned: 'Im Projekt habe ich agile Methoden wie Scrum kennengelernt, die eine effektive Teamarbeit fördern. Durch die gemeinsame Nutzung von Git wurden Merge-Konflikte erfolgreich gelöst.',
      screenshot: '../../../assets/img/screenshot_join.svg',
      githubUrl: 'https://github.com/…',
      expanded: false
    },
    {
      id: 2,
      title: 'Project El Pollo Loco',
      description: 'El Pollo Loco ist ein kleines, herausforderndes Browser-Spiel, in dem Gegner durch Sprünge besiegt, Flaschen eingesammelt und schließlich das verrückte, große Huhn bezwungen wird.',
      technologies: 'JavaScript, HTML, CSS',
      learned: 'Ein Browser-Spiel mit objektorientierter Programmierung wurde umgesetzt, das interaktive Elemente und dynamische Spielmechaniken integriert. Dabei habe ich praxisnah gelernt, wie OOP-Konzepte im Spielkontext angewendet und weiterführende Funktionen implementiert werden.',
      screenshot: '../../../assets/img/screenshot_loco.svg',
      githubUrl: 'https://github.com/…',
      liveUrl: 'https://boban-jakovljevic.de/elPolloLoco',
      expanded: false
    },
    {
      id: 3,
      title: 'Project Pokedex',
      description: 'Ein Pokedex ist eine digitale Enzyklopädie, in der alle Pokémon-Arten samt ihren Eigenschaften, Fähigkeiten und Entwicklungen erfasst sind. Er dient als Nachschlagewerk.',
      technologies: 'JavaScript, REST-API, CSS, HTML',
      learned: 'Im Pokedex-Projekt habe ich eine API integriert, um relevante Pokémon-Daten abzurufen und diese in ansprechenden Bildern darzustellen. Dabei konnte ich den Umgang mit API-Informationen und deren visuelle Aufbereitung praxisnah erlernen.',
      screenshot: '../../../assets/img/screenshot_pokedex.png',
      githubUrl: 'https://github.com/…',
      liveUrl: 'https://boban-jakovljevic.de/pokedex',
      expanded: false
    }
  ];

  // if (this.windowWidth > 1024) {
    
  // }

  toggleExpanded(p: Project) {
    p.expanded = !p.expanded;
    console.log(window.innerWidth);
  }

  window: any;

}
