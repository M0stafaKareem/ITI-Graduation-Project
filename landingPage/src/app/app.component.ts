import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { StatsComponent } from "./stats/stats.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { ServicesComponent } from "./services/services.component";
import { FaqsComponent } from "./faqs/faqs.component";
import { ContactComponent } from "./contact/contact.component";  
import { FooterComponent } from './footer/footer.component'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  SliderComponent, StatsComponent, AboutusComponent, ServicesComponent, FaqsComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingPage';
}
