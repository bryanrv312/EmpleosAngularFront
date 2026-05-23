import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../services/category';
import { RouterLink } from "@angular/router";
import { Category } from '../model/category.interface';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export default class CategoryListComponent implements OnInit {

  private categoryService = inject(CategoryService);

  categoriesList: Category[] = []; //lista para almacenar categorias

  ngOnInit(): void {
    this.categoryService.list()//este es el observable y me suscribo
      .subscribe(categories =>{//categories viene de la API
        this.categoriesList = categories;
    });
  }

  loadAll(){
    this.categoryService.list().subscribe(categories =>{
      this.categoriesList = categories;
    });
  }

  deleteCategory(category: Category){
    this.categoryService.delete(category.id)
      .subscribe(() => {
        this.loadAll();
      });

  }
}
