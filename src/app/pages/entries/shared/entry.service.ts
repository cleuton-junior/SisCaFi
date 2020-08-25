import { Injectable,Injector } from '@angular/core';

import { Observable} from "rxjs";
import { flatMap, catchError, map} from "rxjs/operators";
import { Entry } from "./entry.model";
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resources.services';

import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) { 
    super("api/entries", injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry,super.create.bind(this))
  }

  update(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry,super.update.bind(this))  
  }

  getByMonthAndYear(month: number, year:number):Observable<Entry[]>{
    // case api -this.http.get("api/entries?month&year").subscribe(entries)
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries,month, year))
    )
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    //settings performed to test without api
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {    //use flatMap because it returns observable entry
        entry.category= category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    )
  }

  private filterByMonthAndYear(entries: Entry[],month: number, year: number){
    return entries.filter(entry => {
      const entryDate = moment(entry.date,"DD/MM/YYYY");
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if(monthMatches && yearMatches) return entry;
    })
  }
}
