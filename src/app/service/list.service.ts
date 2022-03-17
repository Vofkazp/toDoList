import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ListDto, ListInterface} from "./list-interface";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get<ListDto>(`${environment.apiUrl}/list/index`).toPromise();
  }

  createItem(list: ListInterface) {
    return this.http.post<ListInterface>(`${environment.apiUrl}/list/create`, list,{
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).toPromise();
  }

  getItemById(id: number) {
    return this.http.get<ListInterface>(`${environment.apiUrl}/list/view/${id}`).toPromise();
  }

  updateItemById(list: ListInterface) {
    return this.http.put<ListInterface>(`${environment.apiUrl}/list/update`, list, {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).toPromise();
  }

  deletelistById(id: number) {
    return this.http.delete(`${environment.apiUrl}/list/delete/${id}`).toPromise();
  }

  updateStatusById(id: number | undefined, status: string) {
    return this.http.put<string>(`${environment.apiUrl}/list/status/${id}`, {visibility: status}, {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).toPromise();
  }
}
