import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCardComponent } from './find-card.component';

describe('FindCardComponent', () => {
  let component: FindCardComponent;
  let fixture: ComponentFixture<FindCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
