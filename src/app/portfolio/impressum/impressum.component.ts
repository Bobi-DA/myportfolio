import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenubarComponent } from "../menubar/menubar.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

}
