import { FormProductComponent } from './components/form-product/form-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { TableComponent } from './components/table/table.component';
import { TreeComponent } from './components/tree/tree.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

const routes: Routes = [
  {path: '', component: NavComponent,
    children: [
      {path: 'create', component: ProductFormComponent},
      {path: 'table', component: TableComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'tree', component: TreeComponent},
      {path: 'drag-drop', component: DragDropComponent},
      {path: 'products', component: ProductsListComponent},
      {path: 'products/create', component: FormProductComponent},
      {path: 'products/edit/:id', component: ProductEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
