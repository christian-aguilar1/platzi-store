import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

@Pipe({
  name: 'deleteRepeats'
})
export class DeleteRepeatsPipe implements PipeTransform {

  transform(value: Product[]): Product[] {
    let i = 0;
    let end: number = value.length;
    let aux: Product[] = value;

    while (aux.length != 0 && i < end) {
      let product: Product = aux[i];
      aux = this.removeDouble(product, aux);

      end = aux.length;
      i++;
    }

    return aux;
  }

  removeDouble(product: Product, products: Product[]): Product[] {
    let aux: Product[] = products.filter(p => p.id !== product.id);
    aux.unshift(product); // Insert the product at the start of the product list.

    return aux;
  }

}
