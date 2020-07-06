import { Injectable,Injector } from '@angular/core';

import { Observable} from "rxjs";
import { flatMap} from "rxjs/operators";
import { Entry } from "./entry.model";
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resources.services';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) { 
    super("api/entries", injector);
  }

  create(entry: Entry): Observable<Entry>{
    //settings performed to test without api
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {    //use flatMap because it returns observable entry
        entry.category= category;
        return super.create(entry);
      })
    )
  }

  update(entry: Entry): Observable<Entry>{
     //settings performed to test without api
     return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {    //use flatMap because it returns observable entry
        entry.category= category;
        return super.update(entry);
    })
     )
  }

  protected jsonDataToResources(jsonData: any[]): Entry[]{
    const entries: Entry[] = [];
    jsonData.forEach(element => {
      const entry= Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return  entries;
  }

  protected jsonDataToResource(jsonData: any): Entry{
    return Object.assign(new Entry(), jsonData);
  }

}
