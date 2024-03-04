import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = `${environment.baseUrl}`

  constructor(private http: HttpClient) { }


  get() {
    return this.http.get(`${this.baseUrl}/employees`);
  }

  getById(id: string) {
    return this.http.get(`${this.baseUrl}/employee/${id}`);
  }

  create(employee: any) {
    return this.http.post(`${this.baseUrl}/create`, { employee });
  }

  
  update(id: string, employee: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, { employee });
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}
