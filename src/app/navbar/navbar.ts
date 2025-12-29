import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen = signal(false);
toggleMenu() {
  this.menuOpen.set(!this.menuOpen());
  document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
}

closeMenu() {
  this.menuOpen.set(false);
  document.body.style.overflow = '';
}

}
