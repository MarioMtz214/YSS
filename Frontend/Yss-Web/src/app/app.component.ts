import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  template: `./home.component.html`,
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, HomeComponent, AboutComponent, PortfolioComponent, ServicesComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Yss-Web';
  textColor: string = '#FF5100'; // Color predeterminado para la sección 1

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2; // Ajuste para el centro de la ventana

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Cambiar el color según la sección visible
        this.textColor = section.id === 'section2' ? '#DBDA17' : '#FF5100';
      }
    });
  }
}
