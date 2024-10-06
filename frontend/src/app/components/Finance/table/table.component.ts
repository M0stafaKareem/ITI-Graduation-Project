import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableDataConfig } from '../../../shared/models/table-data-config.interface';
import { UiService } from '../../../shared/services/ui.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data: TableDataConfig[] = [];
  @Output() removeRow: EventEmitter<TableDataConfig> = new EventEmitter();

  constructor(public uiService: UiService) {}
  handleAction(item: TableDataConfig) {
    this.removeRow.emit(item);
  }
}
