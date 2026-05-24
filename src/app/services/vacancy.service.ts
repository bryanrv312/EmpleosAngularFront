import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vacancy } from '../model/vacancy.interface';


@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  
  private http = inject(HttpClient);

  list(){
    return this.http.get<Vacancy[]>('http://localhost:8080/api/vacantes');
  }

  get(id: number){
    return this.http.get<Vacancy>(`http://localhost:8080/api/vacantes/${id}`);
  }

  create(vacancy: Vacancy){
    return this.http.post<Vacancy>('http://localhost:8080/api/vacantes', vacancy);
  }


}