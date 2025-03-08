import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultsTableComponent } from './results-table/results-table.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    ResultsTableComponent
  ],
  template: `<results-table></results-table>`
})
export class AppComponent { }
