import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { UsuarioModel } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;

  userToken: string;

  constructor( private http: HttpClient ) { 
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(datos: any): Observable<any> {
  return this.http.post(`${this.apiURL}login/saveLogin`, datos).pipe(
                                                                map( resp => {
                                                                  this.guardarToken( resp['token'].token );
                                                                  return resp;
                                                                })
  );
  }

  nuevoUsuario( usuario: UsuarioModel ): Observable<any> {
  return this.http.post(`${this.apiURL}users/saveUsers`, usuario);
  }

  private guardarToken( token: string ) {
    this.userToken = token;
    localStorage.setItem('token', token);
  }

  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado() : boolean {
    
    return this.userToken.length > 2;

  }
}
