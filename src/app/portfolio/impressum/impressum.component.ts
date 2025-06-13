import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenubarComponent } from "../menubar/menubar.component";

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule, MenubarComponent],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

}
