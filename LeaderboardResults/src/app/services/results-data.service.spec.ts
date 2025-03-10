import { TestBed } from '@angular/core/testing';
import { ResultsDataService } from './results-data.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ResultsDataService', () => {
  let service: ResultsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResultsDataService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(ResultsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCupIcon', () => {
    it('should return gold cup for 1st place', () => {
      expect(service.getCupIcon(1)).toBe('assets/icons/gold-cup.svg');
    });

    it('should return silver cup for 2nd place', () => {
      expect(service.getCupIcon(2)).toBe('assets/icons/silver-cup.svg');
    });

    it('should return bronze cup for 3rd place', () => {
      expect(service.getCupIcon(3)).toBe('assets/icons/bronze-cup.svg');
    });

    it('should return empty string for 4th place and beyond', () => {
      expect(service.getCupIcon(4)).toBe('');
      expect(service.getCupIcon(5)).toBe('');
      expect(service.getCupIcon(10)).toBe('');
    });
  });

  describe('getPlayerStats', () => {
    it('should assign correct cup icons to the top 3 players', (done) => {
      const mockResults = {
        results: [
          { playerId: 1, score: 100, gamesPlayed: 5 },
          { playerId: 2, score: 90, gamesPlayed: 6 },
          { playerId: 3, score: 80, gamesPlayed: 4 },
          { playerId: 4, score: 70, gamesPlayed: 7 }
        ]
      };

      const mockPlayers = {
        players: [
          { playerId: 1, name: 'Alice' },
          { playerId: 2, name: 'Bob' },
          { playerId: 3, name: 'Charlie' },
          { playerId: 4, name: 'David' }
        ]
      };

      spyOn(service, 'getPlayerStats').and.returnValue(of(mockResults.results.map((result, index) => ({
        position: index + 1,
        icon: service.getCupIcon(index + 1),
        playerName: mockPlayers.players.find(p => p.playerId === result.playerId)?.name || 'Unknown',
        gamesPlayed: result.gamesPlayed,
        totalScore: result.score
      }))));

      service.getPlayerStats().subscribe((players) => {
        expect(players[0].icon).toBe('assets/icons/gold-cup.svg'); // 1st place
        expect(players[1].icon).toBe('assets/icons/silver-cup.svg'); // 2nd place
        expect(players[2].icon).toBe('assets/icons/bronze-cup.svg'); // 3rd place
        expect(players[3].icon).toBe(''); // No icon for 4th place
        done();
      });
    });

    it('should not assign icons to players ranked 4th or lower', (done) => {
      const mockResults = {
        results: [
          { playerId: 1, score: 100, gamesPlayed: 5 },
          { playerId: 2, score: 90, gamesPlayed: 6 },
          { playerId: 3, score: 80, gamesPlayed: 4 },
          { playerId: 4, score: 70, gamesPlayed: 7 },
          { playerId: 5, score: 60, gamesPlayed: 5 }
        ]
      };

      const mockPlayers = {
        players: [
          { playerId: 1, name: 'Alice' },
          { playerId: 2, name: 'Bob' },
          { playerId: 3, name: 'Charlie' },
          { playerId: 4, name: 'David' },
          { playerId: 5, name: 'Eve' }
        ]
      };

      spyOn(service, 'getPlayerStats').and.returnValue(of(mockResults.results.map((result, index) => ({
        position: index + 1,
        icon: service.getCupIcon(index + 1),
        playerName: mockPlayers.players.find(p => p.playerId === result.playerId)?.name || 'Unknown',
        gamesPlayed: result.gamesPlayed,
        totalScore: result.score
      }))));

      service.getPlayerStats().subscribe((players) => {
        expect(players[3].icon).toBe(''); // 4th place - No icon
        expect(players[4].icon).toBe(''); // 5th place - No icon
        done();
      });
    });
  });
});
