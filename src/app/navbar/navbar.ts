import { NgIf } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  // Mobile menu state
  menuOpen = signal(false);

  // Scroll state
  isScrolled = false;

  // Detect scroll for navbar background change
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // Toggle mobile menu
  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  // Close mobile menu
  closeMenu() {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }
}
