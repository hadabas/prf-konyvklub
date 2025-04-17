import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageclubsComponent } from './manageclubs.component';

describe('ManageclubsComponent', () => {
  let component: ManageclubsComponent;
  let fixture: ComponentFixture<ManageclubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageclubsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageclubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
