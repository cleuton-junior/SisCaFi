import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable,throwError } from "rxjs";
import { map,catchError,flatMap } from "rxjs/operators";

import { Entry } from "./entry.model";
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  getAll(): Observable<Entry[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
    }

  getById(id: number): Observable<Entry>{
      const url = `${this.apiPath}/${id}`;

      return this.http.get(url).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      )
    }

  create(entry: Entry): Observable<Entry>{

    //settings performed to test without api
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {    //use flatMap because it returns observable entry
        entry.category= category;

        // return Observable<Entry>
        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        )
      })
    )
    /* with api
        return this.http.post(this.apiPath, entry).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)*/ 
  
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`;

     //settings performed to test without api
     return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {    //use flatMap because it returns observable entry
        entry.category= category;

        return this.http.put(url, entry).pipe(
        catchError(this.handleError),
        map(() => entry)
      )
    })
     )
      /*with api
     return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)*/
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataToEntries(jsonData: any[]): Entry[]{

    const entries: Entry[] = [];
    jsonData.forEach(element => {
      const entry= Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return  entries;
  }

  private jsonDataToEntry(jsonData: any): Entry{
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any>{
    console.log("ERROR NA REQUESIÇÃO =>",error);
    return throwError(error);
  }

}
