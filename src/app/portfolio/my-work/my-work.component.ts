import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ProjectLayoutComponent } from "./project-layout/project-layout.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [ProjectLayoutComponent, TranslateModule],
  templateUrl: './my-work.component.html',
  styleUrl: './my-work.component.scss'
})


export class MyWorkComponent {

  // slideIndex: number = 1;

  // currentSlide(n: number) {
  //   this.showSlides(this.slideIndex = n);
  // }

  // showSlides(n: number) {
  //   let i;
  //   let slides = document.getElementsByClassName("ref-container") as HTMLCollectionOf<HTMLElement>;
  //   let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;

  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = "none";
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   slides[this.slideIndex - 1].style.display = "flex";
  //   dots[this.slideIndex - 1].className += " active";
  // }

  // currentDot(n: number) {
  //   console.log(n);

  //   this.slideIndex = n

  //   let i;
  //   let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;

  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   dots[this.slideIndex - 1].className += " active";
  // }
  @ViewChild('scrollContainer', { static: false }) scrollContainerRef!: ElementRef;
  @ViewChildren('refItem') refItems!: QueryList<ElementRef>;
  @ViewChildren('dot') dots!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const container = this.scrollContainerRef.nativeElement as HTMLElement;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    this.renderer.listen(container, 'mousedown', (e: MouseEvent) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    this.renderer.listen(container, 'mouseleave', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    this.renderer.listen(container, 'mouseup', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    this.renderer.listen(container, 'mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Geschwindigkeit
      container.scrollLeft = scrollLeft - walk;
    });

        this.renderer.listen(container, 'scroll', () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = this.refItems.first?.nativeElement.offsetWidth || 1;

      const activeIndex = Math.round(scrollLeft / (itemWidth + 16)); // 16 = gap
      this.updateActiveDot(activeIndex);
    });
  }

    updateActiveDot(index: number) {
    this.dots.forEach((dot, i) => {
      if (i === index) {
        dot.nativeElement.classList.add('active');
      } else {
        dot.nativeElement.classList.remove('active');
      }
    });
  }

    scrollToItem(index: number) {
    const item = this.refItems.get(index)?.nativeElement;
    item?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    this.updateActiveDot(index);
  }
  
  scrollTo() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  currentSlide(n: number) { }
  showSlides(n: number) { }
  currentDot(n: number) { }
}
