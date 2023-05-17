import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDetailsService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  filterarray:any;
  constructor(private httpClient: HttpClient) {}

  url="http://localhost:8080";
  usertoken=sessionStorage.getItem('UsertToken');
  
  getProducts() {
    return this.productList.asObservable();
  }

  


  getAddCartDetailsOfAllLocation(){
    console.log(this.usertoken);
    
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${this.usertoken}`
    })
    console.log(headers,'token');
    return this.httpClient.get(`${this.url}/api/cart`,{ headers});
    
  };

  postAddCartDetailsOfAllLocation(createResource:any){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.httpClient.post(`${this.url}/api/cart`, createResource,{
      headers: httpHeaders,
    });
  };

  deleteAllCartLocation(id: number) {
    return this.httpClient.delete(`${this.url}/api/cart/` + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  };

  updateDelivery(id:number,data:any){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.httpClient.put(`${this.url}/api/cart/${id}`,data,{ headers: httpHeaders });

  }


}
