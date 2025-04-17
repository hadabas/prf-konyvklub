import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonapkonyveComponent } from './honapkonyve.component';

describe('HonapkonyveComponent', () => {
  let component: HonapkonyveComponent;
  let fixture: ComponentFixture<HonapkonyveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HonapkonyveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HonapkonyveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
