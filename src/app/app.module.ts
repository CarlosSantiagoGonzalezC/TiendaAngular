import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PiepaginaComponent } from './components/piepagina/piepagina.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ListarcategoriasComponent } from './components/listarcategorias/listarcategorias.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ListarproductosComponent } from './components/listarproductos/listarproductos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    MenuComponent,
    InicioComponent,
    PiepaginaComponent,
    CategoriaComponent,
    ListarcategoriasComponent,
    ProductoComponent,
    ListarproductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
