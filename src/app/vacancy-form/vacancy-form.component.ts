import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VacancyService } from '../services/vacancy.service';
import { CategoryService } from '../services/category';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vacancy-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vacancy-form.component.html',
  styleUrl: './vacancy-form.component.css'
})
export default class VacancyFormComponent {

  private formBuilder = inject(FormBuilder);
  private vacancyService = inject(VacancyService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);


  formGroup? : FormGroup;
  categoriesList: any[] = [];
  selectedFile?: File;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombre: [''],
      descripcion: [''],
      fecha: [''],
      salario: [0],
      destacado: [1],
      imagen: [''],
      estatus: [''],
      detalles: [''],
      categoria: this.formBuilder.group({
        id: [0]
      })   
    });
    this.getListCategories();
  }


  getListCategories(){
    this.categoryService.list()
      .subscribe(categoriesObs => {
        this.categoriesList = categoriesObs;
      });
    }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save(){
    const vacancyForm = this.formGroup!.value;
    console.log(vacancyForm);
    //se usa formData porque el formulario tiene un campo para subir archivos, entonces no podemos enviar un objeto JSON, sino que tenemos que enviar un FormData, que es un objeto que nos permite enviar datos en formato multipart/form-data, que es el formato que se utiliza para enviar archivos a través de HTTP
    const formData = new FormData();
    formData.append(
      'vacante', JSON.stringify(vacancyForm)
    );

    if(this.selectedFile){
      formData.append(
        'archivoImagen',
        this.selectedFile
      );
    }

    this.vacancyService.create(formData)//ya no seria vacancyForm, sino formData, porque ahora estamos enviando un multipart/form-data, que es un formato que permite enviar archivos junto con datos JSON
      .subscribe((data) => {
        console.log('Vacante creada', data);
        this.router.navigate(['/vacantes']);
      });
  }


}
