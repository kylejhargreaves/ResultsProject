import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//API interface responses
interface PlayerResult {
  playerId: number;
  score: number;
  gamesPlayed: number;
}

interface Player {
  playerId: number;
  name: string;
}


//UI interface
export interface PlayerStats {
  position: number;
  icon: string; // the svg path
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsDataService {
  
  private resultsUrl = 'http://localhost:5076/api/Results/results';
  private playersUrl = 'http://localhost:5076/api/Players/players';

  constructor(private http: HttpClient) { }

  getCupIcon(position: number): string {
    switch (position) {
      case 1:
        return 'assets/icons/gold-cup.svg';
      case 2:
        return 'assets/icons/silver-cup.svg';
      case 3:
        return 'assets/icons/bronze-cup.svg';
      default:
        return '';  
    }
  }

  getPlayerStats(): Observable<PlayerStats[]> {
    const results$ = this.http.get<{ results: PlayerResult[] }>(this.resultsUrl);
    const players$ = this.http.get<{ players: Player[] }>(this.playersUrl);

    // Use forkJoin as results depend on player data
    return forkJoin([results$, players$]).pipe(
      map(([resultsData, playersData]) => {

        // Create a lookup map for player names
        const playersMap = new Map<number, string>();
        playersData.players.forEach(player => {
          playersMap.set(player.playerId, player.name);
        });

        //put the results in an array
        let combinedResults = resultsData.results.map(result => ({
          playerId: result.playerId,
          playerName: playersMap.get(result.playerId) || 'Unknown',
          gamesPlayed: result.gamesPlayed,
          totalScore: result.score,
        }));

        // Sort by totalScore descending, then by gamesPlayed ascending
        combinedResults.sort((a, b) => {
          if (b.totalScore !== a.totalScore) {
            return b.totalScore - a.totalScore; // Higher score first
          }
          return a.gamesPlayed - b.gamesPlayed; // If tied, do fewer games played first
        });

        // Assign positions based on sorted order
        return combinedResults.map((player, index) => ({
          position: index + 1, // Rank starts from 1
          icon: this.getCupIcon(index + 1),
          playerName: player.playerName,
          gamesPlayed: player.gamesPlayed,
          totalScore: player.totalScore,
        }));
      })
    );
  }

}
