import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsTableComponent } from './results-table.component';
import { ResultsDataService } from '../services/results-data.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PlayerStats } from '../services/results-data.service';

describe('ResultsTableComponent', () => {
  let component: ResultsTableComponent;
  let fixture: ComponentFixture<ResultsTableComponent>;
  let mockResultsService: jasmine.SpyObj<ResultsDataService>;

  beforeEach(async () => {
    mockResultsService = jasmine.createSpyObj('ResultsDataService', ['getPlayerStats']);

    mockResultsService.getPlayerStats.and.returnValue(of([
      { position: 1, playerName: 'Alice', gamesPlayed: 5, totalScore: 30, icon: 'assets/icons/gold-cup.svg' },
      { position: 2, playerName: 'Bob', gamesPlayed: 7, totalScore: 25, icon: 'assets/icons/silver-cup.svg' },
      { position: 3, playerName: 'Charlie', gamesPlayed: 8, totalScore: 20, icon: 'assets/icons/bronze-cup.svg' },
      { position: 4, playerName: 'David', gamesPlayed: 10, totalScore: 15, icon: '' } // No icon
    ]));

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatSortModule, ResultsTableComponent],
      providers: [
        { provide: ResultsDataService, useValue: mockResultsService },
        provideHttpClient()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize table data on ngOnInit()', () => {
    expect(component.dataSource.data.length).toBe(4);
    expect(component.dataSource.data[0].playerName).toBe('Alice');
    expect(component.dataSource.data[1].playerName).toBe('Bob');
    expect(component.dataSource.data[2].playerName).toBe('Charlie');
    expect(component.dataSource.data[3].playerName).toBe('David'); // Ensure 4th place is included
  });

  it('should assign icons correctly for top 3 players', () => {
    expect(component.dataSource.data[0].icon).toBe('assets/icons/gold-cup.svg'); // Gold
    expect(component.dataSource.data[1].icon).toBe('assets/icons/silver-cup.svg'); // Silver
    expect(component.dataSource.data[2].icon).toBe('assets/icons/bronze-cup.svg'); // Bronze
    expect(component.dataSource.data[3].icon).toBe(''); // No icon for 4th place
  });

  it('should not assign icons for players ranked 4th or lower', () => {
    expect(component.dataSource.data[3].icon).toBe(''); // 4th place should have no icon
  });

  it('should filter results when applyFilter() is called', () => {
    component.dataSource.data = [
      { position: 1, playerName: 'Alice', gamesPlayed: 5, totalScore: 30, icon: 'assets/icons/gold-cup.svg' },
      { position: 2, playerName: 'Bob', gamesPlayed: 7, totalScore: 25, icon: 'assets/icons/silver-cup.svg' }
    ];

    const inputEvent = new Event('input');
    const inputElement = document.createElement('input');
    inputElement.value = 'Alice';
    Object.defineProperty(inputEvent, 'target', { value: inputElement });

    component.applyFilter(inputEvent);

    expect(component.dataSource.filter).toBe('alice');
  });
});
