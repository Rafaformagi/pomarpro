import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private Http:HttpClient) { }


//Autenticar
public autenticaUsuario(usuario:string,senha:string):Observable<any>{
return this.Http.post('http://localhost:3000/usuario/autenticar',{usuario,senha},{observe:'response'})
}




}
