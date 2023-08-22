import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListarcategoriasComponent } from './components/listarcategorias/listarcategorias.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ListarproductosComponent } from './components/listarproductos/listarproductos.component';

const routes: Routes = [
  {path: 'categoria', component: CategoriaComponent},
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'listar-categorias', component: ListarcategoriasComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'listar-productos', component: ListarproductosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
