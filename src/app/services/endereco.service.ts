import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

   private readonly API_URL = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }
  buscarEndereco(cep: string): Observable<any> {
    const url = `${this.API_URL}${cep}/json/`;
    return this.http.get<any>(url);
  }
}
