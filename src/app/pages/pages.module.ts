import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { ModalPriceComponent } from '../shared/components/modal-price/modal-price.component';
import { CardShoppingComponent } from './card-shopping/card-shopping.component';
import { BillComponent } from '../shared/components/bill/bill.component';
import { PopupGoogleComponent } from '../shared/components/popup-google/popup-google.component';
import { FormBillComponent } from '../shared/components/form-bill/form-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsSharedModule } from '../shared/components/components-shared.module';

@NgModule({
  declarations: [
    CanvasComponent,
    ModalPriceComponent,
    CardShoppingComponent,
    BillComponent,
    PopupGoogleComponent,
    FormBillComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsSharedModule,
  ],
})
export class PagesModule {}
