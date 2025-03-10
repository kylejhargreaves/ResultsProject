import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsDataService, PlayerStats } from '../services/results-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'results-table',
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'playerName', 'gamesPlayed', 'totalScore'];
  dataSource: MatTableDataSource<PlayerStats> = new MatTableDataSource();
  errorMessage: string | null = null;
 
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private resultsDataService: ResultsDataService) { }

  ngOnInit(): void {
    this.resultsDataService.getPlayerStats().subscribe({
      next: (data: PlayerStats[]) => {
        this.dataSource.data = data;

        // Alllow view to be initialized before trying to sort
        setTimeout(() => {
          if (this.sort) {
            this.dataSource.sort = this.sort;
          } else {
            console.warn('MatSort is still not available');
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Service is unavailable.';
      }
    });
  }


  ngAfterViewInit() {
    setTimeout(() => {
      if (this.sort) {
        this.dataSource.sort = this.sort;
        console.log("MatSort reassigned after view init:", this.sort);
      } else {
        console.warn("MatSort is not available.");
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Trim whitespace and force lowercase to make the filter case-insensitive.
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
