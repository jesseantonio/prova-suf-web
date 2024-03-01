import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertComponent } from './features/insert/insert.component';
import { ListComponent } from './features/list/list.component';
import { UpdateComponent } from './features/update/update.component';
import { DeleteComponent } from './features/delete/delete.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'inserir', component: InsertComponent },
  { path: 'listar', component: ListComponent },
  { path: 'alterar', component: UpdateComponent },
  { path: 'excluir', component: DeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }