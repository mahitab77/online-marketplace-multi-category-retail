import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {
  @Input() product: any;
}
