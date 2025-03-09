import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsDataService, PlayerStats } from '../services/results-data.service';
import { MatTableModule } from '@angular/material/table';

@Component({
 selector: 'results-table',
 imports: [MatTableModule, CommonModule],
 templateUrl: './results-table.component.html',
 styleUrl: './results-table.component.scss'

})
export class ResultsTableComponent implements OnInit {
 displayedColumns: string[] = ['position', 'playerName', 'gamesPlayed', 'totalScore'];
 dataSource: PlayerStats[] = [];
 errorMessage: string | null = null; // Add this property

 constructor(private resultsDataService: ResultsDataService) { }

 ngOnInit(): void {
   console.log('ResultsTableComponent ngOnInit fired');
   this.resultsDataService.getPlayerStats().subscribe({
     next: (data: PlayerStats[]) => {
       console.log('Data loaded:', data);
       this.dataSource = data;
     },
     error: (err) => {
       console.error('Error loading data:', err);
       this.errorMessage = 'Service is unavailable.';
     }
   });
 }

}
