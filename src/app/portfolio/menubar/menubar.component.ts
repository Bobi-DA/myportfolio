// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-menubar',
//   standalone: true,
//   imports: [],
//   templateUrl: './menubar.component.html',
//   styleUrl: './menubar.component.scss'
// })
// export class MenubarComponent {

//   openBurgerMenu(){
//     let x = document.getElementById("linksContainer");
//     console.log(x?.style.display);

//     if (x!.style.display === "flex") {
//       x!.style.display = "none";
//     } else {
//       x!.style.display = "flex";
//     }
//   }

//   closeBurgerMenu(){
//     let x = document.getElementById("linksContainer");
//     x!.style.display = "none";
//   }
// }

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-menubar',
  standalone: true,
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent implements AfterViewInit {

  @ViewChild('linksContainer') linksContainer!: ElementRef;

  ngAfterViewInit() {
    // Zugriff auf das Element möglich
  }

  openBurgerMenu() {
    const x = this.linksContainer.nativeElement;
    x.style.display = (x.style.display === "flex") ? "none" : "flex";
  }

  closeBurgerMenu() {
    if (window.innerWidth < 1025) {
      this.linksContainer.nativeElement.style.display = "none";
    }
  }
}
