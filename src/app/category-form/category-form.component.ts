import { Component, inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CategoryService } from '../services/category';
import { Category } from '../model/category.interface';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export default class CategoryFormComponent implements OnInit{ //OnInit, interface q trae un callback para poder ejecutar ciertas operaciones cuando el componente inicialice

  //definimos un form
  private fb = inject(FormBuilder); //con el formBuilder podemos crear formularios reactivos 
  private categoryService = inject(CategoryService);//inyectamos el servicio para poder usarlo en el componente
  private router = inject(Router);//inyectamos el router para poder navegar a otras rutas
  private activatedRoute = inject(ActivatedRoute);//inyectamos el activatedRoute para poder obtener los parametros de la ruta

  //inicializacion del formulario
  // form = this.fb.group({
  //   nombre: ['', [Validators.required]],
  //   descripcion: ['', [Validators.required]],
  // });

  form?: FormGroup;//? opcional, porque el formulario se va a inicializar en el ngOnInit
  esEdicion: boolean = false;

  //ngOnInit() aca se ejecuta el codigo cuando el componente se inicializa, es decir, cuando se carga la pagina, es el lugar ideal para hacer peticiones a la API para obtener datos y mostrarlos en el formulario
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');//sna
    //console.log('el id es: ', id);

    if (id) {//si hay un id, entonces es porque queremos editar
      this.categoryService.get(parseInt(id))//obtenemos la categoria por id, este es un observable, entonces me suscribo
        .subscribe(categoryObs => {
          this.esEdicion = true;
          this.form = this.fb.group({//formulario reactivo es un objeto que tiene una propiedad para cada campo del formulario, y cada propiedad es un array que contiene el valor inicial y las validaciones
            nombre: [categoryObs.nombre, [Validators.required]],
            descripcion: [categoryObs.descripcion, [Validators.required]],
          });
        })
    }else{//si no hay un id, entonces es porque queremos crear una nueva categoria
      this.form = this.fb.group({
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
      });
    }
  }

  
  //Crear y Actualizar
  save(){
    //console.log(this.form.value);
    const categoryForm = this.form!.value; //! para decirle a TypeScript que el formulario ya fue inicializado, porque si no, me va a dar un error porque el formulario es opcional y puede ser undefined, pero yo se que en este punto del codigo el formulario ya fue inicializado, entonces le digo a TypeScript que confie en mi y que no me de ese error

    if(this.esEdicion){
      this.categoryService.update(parseInt(this.activatedRoute.snapshot.paramMap.get('id')!), categoryForm)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }else{
      this.categoryService.create(categoryForm)
        .subscribe(() => {
          this.router.navigate(['/']);//navegamos a la ruta principal despues de crear la categoria
        });
    }

     
    
  }

}
