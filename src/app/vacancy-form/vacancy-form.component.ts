import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VacancyService } from '../services/vacancy.service';
import { CategoryService } from '../services/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-vacancy-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './vacancy-form.component.html',
  styleUrl: './vacancy-form.component.css'
})
export default class VacancyFormComponent {

  private formBuilder = inject(FormBuilder);
  private vacancyService = inject(VacancyService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);//obtener parametros de ruta


  formGroup? : FormGroup;
  categoriesList: any[] = [];
  selectedFile?: File;
  esEdicion: boolean = false;
  imagenActual: string = '';

  ngOnInit(): void {
    this.getListCategories();
    const id = this.activatedRoute.snapshot.paramMap.get('id');//obtener el id en caso de editar
    if(id){
      this.vacancyService.get(parseInt(id))
        .subscribe(vacancyObs => {
          this.esEdicion = true;
          this.formGroup = this.formBuilder.group({
            nombre: [vacancyObs.nombre],
            descripcion: [vacancyObs.descripcion],
            fecha: [//se puede evitar poniendo en el backend @JsonFormat(pattern = "yyyy-MM-dd")
              vacancyObs.fecha ? new Date(vacancyObs.fecha).toISOString().split('T')[0] : ''
            ],
            salario: [vacancyObs.salario],
            destacado: [
              vacancyObs.destacado?.toString()
            ],
            //imagen: [vacancyObs.imagen],
            estatus: [vacancyObs.estatus],
            detalles: [vacancyObs.detalles],
            categoria: this.formBuilder.group({
              id: [vacancyObs.categoria.id]
            })
          });
          this.imagenActual = vacancyObs.imagen;
        });
    }else{
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
    //this.getListCategories();
    }
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

  //crear y editar
  save(){
    const vacancyForm = this.formGroup!.value;
    //console.log(vacancyForm);
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
    if(this.esEdicion){
      this.vacancyService.update(parseInt(this.activatedRoute.snapshot.paramMap.get('id')!), formData)
        .subscribe(() => {
          this.router.navigate(['/vacantes']);
        });
    }else{
      this.vacancyService.create(formData)//ya no seria vacancyForm, sino formData, porque ahora estamos enviando un multipart/form-data, que es un formato que permite enviar archivos junto con datos JSON
      .subscribe((data) => {
        console.log('Vacante creada', data);
        this.router.navigate(['/vacantes']);
      });
    }

    
  }


}
