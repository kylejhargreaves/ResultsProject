import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { ResultsTableComponent } from './results-table/results-table.component';
import { IntroCardComponent } from './intro-card/intro-card.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { FindCardComponent } from './find-card/find-card.component';
import { ResultsDataService } from './services/results-data.service';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatGridListModule,
        ResultsTableComponent,
        IntroCardComponent,
        ContactCardComponent,
        FindCardComponent
      ],
      providers: [
        ResultsDataService,
        provideHttpClient() // ✅ Use provideHttpClient() instead of HttpClientTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize gridCols to 3 for desktop', () => {
    expect(component.gridCols).toBe(3);
  });

  it('should call updateGridColumns() on init', () => {
    spyOn(component, 'updateGridColumns');
    component.ngOnInit();
    expect(component.updateGridColumns).toHaveBeenCalled();
  });

  it('should update gridCols based on window width (desktop view)', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1024);
    component.updateGridColumns();
    expect(component.gridCols).toBe(3);
  });

  it('should update gridCols based on window width (mobile view)', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
    component.updateGridColumns();
    expect(component.gridCols).toBe(1);
  });

  it('should update gridCols when window is resized', () => {
    spyOn(component, 'updateGridColumns');
    component.onResize();
    expect(component.updateGridColumns).toHaveBeenCalled();
  });
});
