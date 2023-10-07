import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { delay, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = `${environment.API}/users`
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<User[]>(this.API)
    .pipe(
      first()
    )
  }
}
