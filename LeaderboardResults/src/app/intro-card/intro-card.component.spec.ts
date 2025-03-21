import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroCardComponent } from './intro-card.component';

describe('IntroCardComponent', () => {
  let component: IntroCardComponent;
  let fixture: ComponentFixture<IntroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
