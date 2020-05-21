import { Category } from '../../categories/shared/category.model';

export class Entry{
  public id?: number;
  public nome?: string;
  public description?: string;
  public type?: string;
  public amount?: string;
  public date?: string;
  public paid : boolean;
  public categoryId?: number;
  public category?: Category
    construtor(){ }

    static types = {
        expense: 'Despesa',
        renevue: 'Receita'
    };

    get paidText(): string {
      return this.paid ? 'Pago' : 'Pedente';
    }
}
