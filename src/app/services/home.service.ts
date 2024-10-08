import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }


  //FUnção para buscar usuários
  public getHomes():Observable<any>{
    return this.http.get('http://localhost:3000/home/buscarTodos',
      {observe:'response'}
    )

  }
}
