import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDetailsService {

  constructor(private httpClient: HttpClient) {}

  url='http://localhost:8080';
  token=sessionStorage.getItem('adminToken');
  usertoken=sessionStorage.getItem("UsertToken")

  
  adminRegisterDetail(data:any){
    return this.httpClient.post(`${this.url}/auth/adminregister`,data
    );
  }

  adminLogin(data:any){
    return this.httpClient.post(`${this.url}/auth/adminlogin`,data);
    }

  photo(data:any){
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${this.usertoken}`
    })
    console.log(headers,'token');
    return this.httpClient.post(`${this.url}/api/product`,data)
  }
 
}
