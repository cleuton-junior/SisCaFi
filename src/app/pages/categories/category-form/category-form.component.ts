import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submitingForm: boolean = false;
  category: Category = new Category;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();

  }

  ngAfterContentChecked() {
    this.setPageTitle(); // running a few times, where will be set page name
  }

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path =="new")
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id:[null],
      name:[null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }
  
  private loadCategory() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category) // binds loaded category data to Categoryform
        },
        (error) => alert("Ocorreu um erro no servidor, tente mais tarde.")
        
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Nova Categoria'
    else{
      const categoryName = this.category.name || '' // const created to prevent category name from coming empty
      this.pageTitle = 'Editando Categoria:' + categoryName;
    }

  }
}
