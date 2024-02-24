import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductsTagComponent } from './components/update-products-tag/update-products-tag.component';
import { AddEntryVoucherComponent } from './components/add-entry-voucher/add-entry-voucher.component';
import { DisplayEntryVoouchersComponent } from './components/display-entry-voouchers/display-entry-voouchers.component';
import { ExitVoucherComponent } from './components/exit-voucher/exit-voucher.component';
import { DisplaySuperTagsComponent } from './components/display-super-tags/display-super-tags.component';
import { DisplayTagsComponent } from './components/display-tags/display-tags.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import {AuthGuard} from "./gards/auth.guard";
import {ExitVoucherListComponent} from "./components/exit-voucher-list/exit-voucher-list.component";



const routes: Routes = [
  { path: '', component: DisplaySuperTagsComponent },
  { path: 'add-product/:evNumber', component: AddProductComponent ,canActivate:[AuthGuard],data:{roles:['ADMIN']}},
  { path: 'products', component: ProductComponent },
  { path: 'update-tag', component: UpdateProductsTagComponent, canActivate:[AuthGuard],data:{roles:['ADMIN']} },
  { path: 'evs', component: DisplayEntryVoouchersComponent, canActivate:[AuthGuard],data:{roles:['ADMIN']}},
  { path: 'entryForm', component: AddEntryVoucherComponent, canActivate:[AuthGuard],data:{roles:['ADMIN']}},
  { path: 'xvs', component: ExitVoucherComponent },
  { path: 'display-super-tags', component: DisplaySuperTagsComponent },
  { path: 'products/:supertagName/:tagName', component: DisplayProductsComponent },
  { path: 'display-tags/:superTagName', component: DisplayTagsComponent },
  {path: 'xvlist', component:ExitVoucherListComponent, canActivate:[AuthGuard],data:{roles:['ADMIN']}},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
