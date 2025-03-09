import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { ResultsTableComponent } from './results-table/results-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    
    RouterOutlet,
    MatTableModule,
    ResultsTableComponent
  ],
  template: `<results-table></results-table>`,
  styleUrl: 'app.component.scss'
})
export class AppComponent { }


// import { Component } from '@angular/core';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTableModule } from '@angular/material/table';
// //import { ResultsTableComponent } from './results-table/results-table.component';
// import { TestTableComponent } from './test-table/test-table.component';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     HttpClientModule,
//     BrowserAnimationsModule,
//     MatTableModule,
//     //ResultsTableComponent
//     TestTableComponent
//   ],
//   //template: `<results-table></results-table>`
//   template: `<app-test-table></app-test-table>`
// })
// export class AppComponent { }

