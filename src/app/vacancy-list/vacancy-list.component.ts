import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../model/vacancy.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vacancy-list',
  standalone: true,//
  imports: [DatePipe, RouterLink],
  templateUrl: './vacancy-list.component.html',
  styleUrl: './vacancy-list.component.css'
})
export default class VacancyListComponent {

  private vacancyService = inject(VacancyService);

  vacancyList: Vacancy[] = [];

  ngOnInit(): void {
    this.vacancyService.list()
      .subscribe(vacanciesObs => {
        this.vacancyList = vacanciesObs;
      });
    }

}
