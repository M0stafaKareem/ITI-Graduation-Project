import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { ServicesComponent } from "./services/services.component";  // Make sure the path is correct



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SliderComponent, ServicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingPage';
}
