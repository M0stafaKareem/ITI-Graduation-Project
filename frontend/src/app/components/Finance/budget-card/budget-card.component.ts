import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BudgetCardConfig } from '../../../shared/models/budget-card-config.interface';
import { UiService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.scss',
})
export class BudgetCardComponent implements OnInit {
  @Input() config!: BudgetCardConfig;
  @Input() isDelete: boolean = false;

  bgColor: string = '';
  beforColor: string = '';
  textColor: string = '';
  borderColor: string = '';
  constructor(private router: Router, private uiService: UiService) {}

  ngOnInit(): void {
    if (!this.config) {
      return;
    }

    this.borderColor = this.uiService.generateTailwindClass(
      this.config.color,
      'border'
    );
    this.textColor = this.uiService.generateTailwindClass(
      this.config.color,
      'text'
    );
    this.bgColor = 'bg-body-secondary';
  }

  calculatePercentage() {
    return (this.config.spent / this.config.budget) * 100 + '%';
  }

  viewDetails() {
    if (this.config.onClick) {
      this.config.onClick();
    }
  }
}
