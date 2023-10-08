import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: 'Pergunta de exemplo' },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente ConfirmationDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o conteúdo de pergunta passado como entrada', () => {
    fixture.detectChanges();
    const contentElement = fixture.nativeElement.querySelector('div[mat-dialog-content] p');
    expect(contentElement.textContent).toContain('Pergunta de exemplo');
  });

  it('deve ter um botão "Sim"', () => {
    fixture.detectChanges();
    const yesButtonElement = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(yesButtonElement.textContent).toContain('Sim');
  });

  it('deve ter um botão "Não"', () => {
    fixture.detectChanges();
    const noButtonElement = fixture.nativeElement.querySelector('button[color="warn"]');
    expect(noButtonElement.textContent).toContain('Não');
  });
});
