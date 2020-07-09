import { Injectable,Injector } from '@angular/core';

import { Observable} from "rxjs";
import { flatMap, catchError} from "rxjs/operators";
import { Entry } from "./entry.model";
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resources.services';

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
}
