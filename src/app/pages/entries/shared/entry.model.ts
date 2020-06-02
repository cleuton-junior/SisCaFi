import { Category } from '../../categories/shared/category.model';
import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Entry extends BaseResourceModel{
  public id?: number;
  public name?: string;
  public description?: string;
  public type?: string;
  public amount?: string;
  public date?: string;
  public paid : boolean;
  public categoryId?: number;
  public category?: Category
    construtor(){

     }

    static types = {
        expense: 'Despesa',
        revernue: 'Receita'
    };

    get paidText(): string {
      return this.paid ? 'Pago' : 'Pendente';
    }
}
