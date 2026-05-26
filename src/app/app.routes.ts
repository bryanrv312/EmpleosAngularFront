import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./category-list/category-list.component')
    },
    {
        path: 'new',
        loadComponent: () => import('./category-form/category-form.component')
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./category-form/category-form.component')
    },
    {
        path: 'vacantes',
        loadComponent: () => import('./vacancy-list/vacancy-list.component')
    },
    {
        path: 'newVacancy',
        loadComponent: () => import('./vacancy-form/vacancy-form.component')
    },
    {
        path: 'vacantes/:id/editVacancy',
        loadComponent: () => import('./vacancy-form/vacancy-form.component')
    },

];
