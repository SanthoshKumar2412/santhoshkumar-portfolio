import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Navbar } from './navbar/navbar';
import { About } from "./about/about";
import { Certificates } from "./certificates/certificates";
import { Projects } from "./projects/projects";
import { Contact } from "./contact/contact";
import { Footer } from "./footer/footer";
import { Skills } from "./skills/skills";


@Component({
  selector: 'app-root',
  imports: [Navbar, About, Certificates, Projects, Contact, Footer, Skills, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('santhosh-portfolio');
}
