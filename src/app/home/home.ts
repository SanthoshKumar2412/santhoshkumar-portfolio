import { AfterViewInit, Component } from '@angular/core';
import { About } from '../about/about';

@Component({
  selector: 'app-home',
  imports: [About],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  ngAfterViewInit() {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section));
  }

}
