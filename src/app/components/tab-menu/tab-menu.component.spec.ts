import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMenuComponent } from './tab-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { AppModule } from '../../app.module';

describe('TabMenuComponent', () => {
  let component: TabMenuComponent;
  let fixture: ComponentFixture<TabMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabMenuComponent],
      imports: [MatDialogModule, HttpClientModule, AppModule],
      providers: [
        provideMockStore({}),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
