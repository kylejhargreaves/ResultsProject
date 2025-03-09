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

  getPlayerStats(): Observable<PlayerStats[]> {
    const results$ = this.http.get<{ results: PlayerResult[] }>(this.resultsUrl);
    const players$ = this.http.get<{ players: Player[] }>(this.playersUrl);

    // use fork as results is dependant on player data
    return forkJoin([results$, players$]).pipe(
      map(([resultsData, playersData]) => {

        console.log(resultsData);
        console.log(playersData);
        // Do a look up for the player data
        const playersMap = new Map<number, string>();
        playersData.players.forEach(player => {
          playersMap.set(player.playerId, player.name);
        });

        // Combine the results into an array
        return resultsData.results.map((result,index) => ({
          position: index + 1,
          playerName: playersMap.get(result.playerId) || 'Unknown',
          gamesPlayed: result.gamesPlayed,
          totalScore: result.score,
        }));
      })
    );
  }
}
