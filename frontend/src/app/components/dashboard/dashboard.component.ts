import { Component } from '@angular/core';
// Angular Chart Component
import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CountUpModule } from 'ngx-countup'; // Import the CountUpModule
import { ActivatedRoute , Router, RouterLink  } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AgCharts , CountUpModule ,RouterLink ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('fill', [
      state('*', style({ width: '{{ width }}%' }), { params: { width: 0 } }),
      transition('* => *', animate('2s ease-out')),
    ]),
  ],
  
})
export class DashboardComponent {
  makeIconColorful(element: HTMLElement , color: string) {
  
    if (element) {
      // transition:  all ease-in-out  0.7s
      element.style.transition = 'all ease-in-out 0.7s';
      element.style.color = color;
    }
  }
   Clients:number = 400;
   CasesSolved:number =5;
   CasesUnsolved:number = 5;
   Lawyers:number = 50;
   Tasks:number = 18;
   CasesPercent:number = this.CasesSolved / (this.CasesSolved + this.CasesUnsolved) * 100;
   fillValue = 0;
  constructor( private route: ActivatedRoute , private router: Router ) {}
  ngOnInit(): void {
    setTimeout(() => {
      console.log("filling bar");

      this.fillValue =  this.CasesPercent;

      console.log(this.fillValue);
    });
  }
  
}
