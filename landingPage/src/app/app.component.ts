import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
// import { ServicesComponent } from "./services/services.component";
import { StatsComponent } from "./stats/stats.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { ServicesComponent } from "./services/services.component";  


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SliderComponent, StatsComponent, AboutusComponent, ServicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingPage';
}
