import { Category } from "./category.interface";

export interface Vacancy {
    id?: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    salario: number;
    destacado: number;
    imagen: string;
    estatus: string;
    detalles: string;
    categoria: Category;
}