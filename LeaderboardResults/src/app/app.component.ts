import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ResultsTableComponent } from './results-table/results-table.component';
import { IntroCardComponent } from './intro-card/intro-card.component'
import { ContactCardComponent } from './contact-card/contact-card.component'
import { FindCardComponent } from './find-card/find-card.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTableModule,
    ResultsTableComponent,
    IntroCardComponent,
    ContactCardComponent,
    FindCardComponent
  ],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss'
})
export class AppComponent { }
