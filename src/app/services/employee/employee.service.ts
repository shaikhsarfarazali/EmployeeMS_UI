import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee } from '../../interfaces/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl = `${environment.apiUrl}employee`;

  constructor(private http: HttpClient) { }

  getCurrentUserId(): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}/employee-id`);
  }

  // GET all employees
  getAllEmployees(): Observable<any[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/all`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  // GET employee by ID
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // GET employee by ID
  getSingleEmpById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/singleEmp/${id}`);
  }

  // POST create employee
  createEmployee(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }

  // PUT update employee
  updateEmployee(employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${employee.id}`, employee);
  }

  // DELETE employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}