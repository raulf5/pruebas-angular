import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

import {Product, CreateProductDTO,UpdateProductDTO} from '../models/Products'

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl='https://young-sands-07814.herokuapp.com/api/products/'
  constructor(private http:HttpClient) {}

  getAllProduct(limit?:number,offset?:number) {
    let params = new HttpParams()
    if(limit && offset){
      params = params.set('limit',limit)
      params = params.set('offset',offset)
    }
    return this.http.get<Product[]>(this.apiUrl, {params})
  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}${id}`)
  }

  getProductByPage(limit:number,offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{
      params:{limit,offset}
    })
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id:string,dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}${id}`,dto)
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}${id}`)
  }
}
