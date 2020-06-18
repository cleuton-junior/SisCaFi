import { Injectable, Injector } from '@angular/core';

import { Category } from "./category.model";

import { BaseResourceService } from 'src/app/shared/services/base-resources.services';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category>{

  protected apiPath: string = "api/categories";

  constructor(protected injector: Injector) {
    super("api/categories", injector);
   }

}
