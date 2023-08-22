import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static readonly DEFAULT_SHOP_ID: number = 5;

  constructor(private http: HttpClient) { }

  searchCombination(optShopId?: number) {
    const shopId: number = optShopId ? optShopId : ApiService.DEFAULT_SHOP_ID;
    return this.http.get(environment.baseUrl + '/shop/' + shopId + '/search-combination');
  }
}
