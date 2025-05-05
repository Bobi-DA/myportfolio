import { Component } from '@angular/core';
import { ProjectLayoutComponent } from "./project-layout/project-layout.component";

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [ProjectLayoutComponent],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})
export class MyWorkComponent {
  
}
