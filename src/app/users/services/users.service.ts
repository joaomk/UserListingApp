import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { delay, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = `${environment.API}/users`
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<User[]>(this.API)
    .pipe(
      delay(1000),
      first()
    )
  }
  save(record: Partial<User>){
    if( record.id ){
      return this.update(record)
    }
    return this.create(record)
  }

  loadById(id: string){
    return this.http.get<User>(`${this.API}/${id}`)
  }

  private create(record: Partial<User>){
    return this.http.post<User>(this.API, record).pipe(first())
  }

  private update(record: Partial<User>){
    return this.http.put<User>(`${this.API}/${record.id}`, record).pipe(first())
  }

  remove(record: Partial<User>){
    return this.http.delete(`${this.API}/${record.id}`).pipe(first())
  }
}
