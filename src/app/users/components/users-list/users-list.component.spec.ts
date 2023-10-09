import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../containers/user-form/user-form.component';
import { MatTableModule } from '@angular/material/table';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [MatTableModule],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
      ],
    });

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente UsersListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o diálogo de edição ao chamar onEdit', () => {
    const user = {
      id: "1",
      name: "Usuário 1",
      email: "usuario1@example.com",
      cpf: "000.000.000-00",
      phoneNumber: "(99) 9999-9999",
      phoneType: "cell-phone"
    };
    component.onEdit(user);
    expect(mockDialog.open).toHaveBeenCalledWith(UserFormComponent, {
      minWidth: '70vw',
      data: user,
    });
  });

  it('deve emitir o evento "remove" ao chamar onDelete', () => {
    const user = {
      id: "1",
      name: "Usuário 1",
      email: "usuario1@example.com",
      cpf: "000.000.000-00",
      phoneNumber: "(99) 9999-9999",
      phoneType: "cell-phone"
    };
    spyOn(component.remove, 'emit');
    component.onDelete(user);
    expect(component.remove.emit).toHaveBeenCalledWith(user);
  });
});
