import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table';
import { ResultsTableComponent } from './results-table/results-table.component';
import { IntroCardComponent } from './intro-card/intro-card.component'
import { ContactCardComponent } from './contact-card/contact-card.component'
import { FindCardComponent } from './find-card/find-card.component'
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatGridListModule,
    ResultsTableComponent,
    IntroCardComponent,
    ContactCardComponent,
    FindCardComponent
  ],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss'
})
export class AppComponent implements OnInit {
  gridCols = 3; // Set columns for desktop

  constructor() {
    this.updateGridColumns();
  }
  ngOnInit(): void {
    this.updateGridColumns(); // Ensure it runs after component initializes
  }
  @HostListener('window:resize', [])
  onResize() {
    this.updateGridColumns();
  }

  updateGridColumns() {
    this.gridCols = window.innerWidth < 768 ? 1 : 3; // Columns on mobile, columns on desktop
  }
}
