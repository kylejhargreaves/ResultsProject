import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsDataService, PlayerStats } from '../services/results-data.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'results-table',
  imports: [
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'playerName', 'gamesPlayed', 'totalScore'];
  dataSource: MatTableDataSource<PlayerStats> = new MatTableDataSource();
  errorMessage: string | null = null;

  constructor(private resultsDataService: ResultsDataService) { }

  ngOnInit(): void {
    console.log('ResultsTableComponent ngOnInit fired');
    this.resultsDataService.getPlayerStats().subscribe({
      next: (data: PlayerStats[]) => {
        console.log('Data loaded:', data);
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.errorMessage = 'Service is unavailable.';
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Trim whitespace and force lowercase to make the filter case-insensitive.
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
