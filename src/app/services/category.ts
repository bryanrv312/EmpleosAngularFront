import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../model/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private http = inject(HttpClient);


  list(){
    return this.http.get<Category[]>('http://localhost:8080/api/categorias');
  }

  get(id: number){
    return this.http.get<Category>(`http://localhost:8080/api/categorias/${id}`);
  }

  create(category: Category){
    return this.http.post<Category>('http://localhost:8080/api/categorias', category);
  }

  update(id: number, category: Category){
    return this.http.put<Category>(`http://localhost:8080/api/categorias/${id}`, category);
  }

  delete(id: number){
    return this.http.delete<void>(`http://localhost:8080/api/categorias/${id}`);
  }

}
