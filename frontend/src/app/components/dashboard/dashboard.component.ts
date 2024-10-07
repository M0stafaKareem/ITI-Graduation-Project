import { Component, ViewChild } from '@angular/core';

// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CountUpModule } from 'ngx-countup'; // Import the CountUpModule
import { ActivatedRoute , Router, RouterLink  } from '@angular/router';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis
} from "ng-apexcharts";
import { EventCalendarComponent } from "../event-calendar/event-calendar.component";
import { TodoListComponent } from "../todo-list/todo-list.component";
import { ClientsService } from '../../shared/services/clients.service';
import { CasesService } from '../../shared/services/cases.service';
import { LawyersService } from '../../shared/services/lawyers.service';
import { TodoListService } from '../../shared/services/todo-list.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CountUpModule, RouterLink, NgApexchartsModule, EventCalendarComponent, TodoListComponent],
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
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> ;
  makeIconColorful(element: HTMLElement , color: string) {
  
    if (element) {
      // transition:  all ease-in-out  0.7s
      element.style.transition = 'all ease-in-out 0.7s';
      element.style.color = color;
    }
  }
   Clients:number = 0;
   CasesSolved:number = 0;
   CasesUnsolved:number = 0;
   Lawyers:number = 0;
   Tasks:number = 0;
   CasesPercent:number = this.CasesSolved / (this.CasesSolved + this.CasesUnsolved) * 100;
   fillValue = 0;
  constructor( private route: ActivatedRoute , private router: Router , private ClientsService: ClientsService,
    private CasesService: CasesService , private LawyersService : LawyersService , private TodoListService: TodoListService
  ) {
    ClientsService.getClients().subscribe((data) => {
      this.Clients = data.length;
    });

    CasesService.getCases().subscribe((data) => {
      console.log(data);
      
      this.CasesSolved = data.filter((item) => item.status === "closed").length;
      this.CasesUnsolved = data.filter((item) => item.status === "running").length;
      this.CasesPercent = this.CasesSolved / (this.CasesSolved + this.CasesUnsolved) * 100;
      this.fillValue =  this.CasesPercent;

    });

    LawyersService.getLawyers().subscribe((data) => {
      this.Lawyers = data.length;
    });

    TodoListService.getTodos().subscribe((data) => {
      this.Tasks = data.length;
    });


    this.chartOptions = {
      series: [
        {
          name: "Expenses",
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: 7,
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "1/11/2000",
          "2/11/2000",
          "3/11/2000",
          "4/11/2000",
          "5/11/2000",
          "6/11/2000",
          "7/11/2000",
          "8/11/2000",
          "9/11/2000",
          "10/11/2000",
          "11/11/2000",
          "12/11/2000",
          "1/11/2001",
          "2/11/2001",
          "3/11/2001",
          "4/11/2001",
          "5/11/2001",
          "6/11/2001"
        ]
      },
      title: {
        text: "Traffic Sources",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: "Engagement"
        }
      }
    };
  }
  ngOnInit(): void {
    setTimeout(() => {
      console.log("filling bar");
      console.log(this.CasesPercent);

      this.fillValue =  this.CasesPercent;

      console.log(this.fillValue);
    });
  }
  
}
