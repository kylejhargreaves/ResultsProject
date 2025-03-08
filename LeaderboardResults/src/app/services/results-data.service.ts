import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface PlayerResult {
  PlayerId: number;
  Score: number;
  GamesPlayed: number;
}

interface Player {
  PlayerId: number;
  Name: string;
}

export interface PlayerStats {
  PlayerId: number;
  Name: string;
  Score: number;
  GamesPlayed: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsDataService {
  
  private resultsUrl = 'http://localhost:5076/api/Results/results';
  private playersUrl = 'http://localhost:5076/api/Players/players';

  constructor(private http: HttpClient) { }

  getPlayerStats(): Observable<PlayerStats[]> {
    const results$ = this.http.get<{ Results: PlayerResult[] }>(this.resultsUrl);
    const players$ = this.http.get<{ Players: Player[] }>(this.playersUrl);

    // use fork as results is dependant on player data
    return forkJoin([results$, players$]).pipe(
      map(([resultsData, playersData]) => {

        // Do a look up for the player data
        const playersMap = new Map<number, string>();
        playersData.Players.forEach(player => {
          playersMap.set(player.PlayerId, player.Name);
        });

        // Combine the results into an array
        return resultsData.Results.map(result => ({
          PlayerId: result.PlayerId,
          Name: playersMap.get(result.PlayerId) || 'Unknown',
          Score: result.Score,
          GamesPlayed: result.GamesPlayed
        }));
      })
    );
  }
}
