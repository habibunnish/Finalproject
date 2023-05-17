import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {

  constructor(private httpClient: HttpClient) {}

  url='http://localhost:8080';
  token=sessionStorage.getItem("UsertToken")
 

  login(data:any){
    return this.httpClient.post(`${this.url}/auth/login`, data, );
   }
}