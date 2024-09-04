import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {

  constructor(private http:HttpClient) { }
  


  public addMovimento(info:any):Observable<any>{
    return this.http.post('http://localhost:3000/movimento/add',
    {info},
      {observe:'response'}
    )
  }

  //Função de busca de cadastros
public getMovimentos():Observable<any>{
  return this.http.get('http://localhost:3000/movimento/buscaTodos',
 {observe:'response'}
  )
}
}