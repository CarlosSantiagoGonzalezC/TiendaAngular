import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listarcategorias',
  templateUrl: './listarcategorias.component.html',
  styleUrls: ['./listarcategorias.component.css']
})
export class ListarcategoriasComponent implements OnInit {
  listaCategorias: any;
  listaCategoria: any;
  display = "none";
  idCategoria: any;
  public categoriaConsultada: string = '';
  public frmCategoria!: FormGroup;
  public categoria!: Categoria;
  public mensaje: string = '';

  constructor(private location: Location, private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.listarCategorias();
    this.frmCategoria = new FormGroup({
      txtNombre: new FormControl('',
        [Validators.required, Validators.maxLength(60)]),
    })
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((result) => {
      this.listaCategorias = result;
    })
  }

  cerrarModal() {
    this.display = "none";
  }

  abrirModalEliminar(id: number) {
    this.display = "block";
    this.idCategoria = id;
  }

  eliminarCategoria() {
    this.categoriaService.eliminarCategoria(this.idCategoria).subscribe((result) => {
      this.listarCategorias();
    }, error => {
      console.log(error);
    });
    this.cerrarModal();
  }

  abrirModalActualizar(id: number) {
    this.display = "block";
    this.idCategoria = id;
  }

  public actualizarCategoria = (frmCategoriaValue: { txtNombre: string }) => {
    if (this.frmCategoria.valid) {
      this.categoria = new Categoria(frmCategoriaValue.txtNombre.valueOf());
    }
    this.categoriaService.editarCategoria(this.idCategoria, this.categoria).subscribe(respuesta => {
      console.log(respuesta);
      this.mensaje = "Categoria actualizada correctamente";
      window.location.reload();
    }, error => {
      console.log(error);
      this.mensaje = "Problemas al actualizar categoria!!";
      this.frmCategoria.reset();
    });
  }

  obtenerCategoria(id: String) {
    this.categoriaService.getCategoria(id).subscribe((result) => {
      this.listaCategoria = Object.values(result);
      this.categoriaConsultada = this.listaCategoria[1];
    })
  }
}
