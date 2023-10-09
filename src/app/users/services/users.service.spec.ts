import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve atualizar um usuário existente', () => {
    const existingUser: User = {
      id: "1",
      name: "Usuário 1",
      email: "usuario1@example.com",
      cpf: "000.000.000-00",
      phoneNumber: "(99) 9999-9999",
      phoneType: "cell-phone"
    };
    service.save(existingUser).subscribe((user) => {
      expect(user).toBeTruthy();
      expect(user.id).toBe(existingUser.id);
      expect(user.name).toBe(existingUser.name);
      expect(user.email).toBe(existingUser.email);
    });

    const req = httpTestingController.expectOne(`${environment.API}/users/${existingUser.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(existingUser);
  });

  it('deve carregar um usuário por ID', () => {
    const userId = '1';
    const userToLoad: User = {
      id: "1",
      name: "Usuário 1",
      email: "usuario1@example.com",
      cpf: "000.000.000-00",
      phoneNumber: "(99) 9999-9999",
      phoneType: "cell-phone"
    };
    service.loadById(userId).subscribe((user) => {
      expect(user).toEqual(userToLoad);
    });

    const req = httpTestingController.expectOne(`${environment.API}/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(userToLoad);
  });

  it('deve remover um usuário', () => {
    const userToDelete: Partial<User> = { id: '1', name: 'John', email: 'john@example.com' };
    service.remove(userToDelete).subscribe(() => {
    });

    const req = httpTestingController.expectOne(`${environment.API}/users/${userToDelete.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
