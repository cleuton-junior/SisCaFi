import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormsFieldErrorComponent } from './components/forms-field-error/forms-field-error.component';

@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent, FormsFieldErrorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    FormsFieldErrorComponent
    
  ]
})
export class SharedModule { }
