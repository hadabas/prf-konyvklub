import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonyvertekelesComponent } from './konyvertekeles.component';

describe('KonyvertekelesComponent', () => {
  let component: KonyvertekelesComponent;
  let fixture: ComponentFixture<KonyvertekelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonyvertekelesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonyvertekelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
