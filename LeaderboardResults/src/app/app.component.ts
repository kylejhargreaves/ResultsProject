import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ResultsTableComponent } from './results-table/results-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTableModule,
    ResultsTableComponent
  ],
  template: `<results-table></results-table>`,
  styleUrl: 'app.component.scss'
})
export class AppComponent { }
