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

  constructor(private resultsDataService: ResultsDataService) { }

  ngOnInit(): void {
    this.resultsDataService.getPlayerStats().subscribe((data: PlayerStats[]) => {
      this.dataSource = data;
    });
  }

}
