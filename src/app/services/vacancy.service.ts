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

  // create(vacancy: Vacancy){
  //   return this.http.post<Vacancy>('http://localhost:8080/api/vacantes', vacancy);
  // }

  //todos los campos ahora van serializados dentro de un FormData, porque ahora el formulario tiene un campo para subir archivos, entonces no podemos enviar un objeto JSON, sino que tenemos que enviar un FormData, que es un objeto que nos permite enviar datos en formato multipart/form-data, que es el formato que se utiliza para enviar archivos a través de HTTP
  create(formData: FormData){
    return this.http.post<Vacancy>('http://localhost:8080/api/vacantes', formData);
  }

  update(id: number, formData: FormData){
    return this.http.put<Vacancy>(`http://localhost:8080/api/vacantes/${id}`, formData);
  }


}