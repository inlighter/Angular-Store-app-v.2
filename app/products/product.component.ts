import { Component, Input } from '@angular/core';
import { Product } from '../stores/product.model';

@Component({
    selector: 'single-product',
    template: `
    <tr>
      <th scope="row">2</th>
      <td>{{ product.name }}</td>
      <td>{{ product?.description }}</td>
    </tr>
    `

})

export class ProductComponent {
    @Input() product: Product;
}