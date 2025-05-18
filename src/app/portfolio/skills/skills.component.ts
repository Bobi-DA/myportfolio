import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  scrollTo() {
    const element = document.getElementById('myWork');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
