import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {
  public frmCategoria!: FormGroup;
  public categoria!: Categoria;
  public mensaje:string = '';
  public listaCategorias: any;

  constructor (private location: Location, private categoriaService: CategoriaService, private router: Router){
  }

  ngOnInit(): void {
      this.frmCategoria = new FormGroup({
        txtNombre: new FormControl ('',
        [Validators . required, Validators . maxLength(60)]),
      })
  }

  public agregarCategoria = (frmCategoriaValue: {txtNombre: string})=> {
    if (this.frmCategoria.valid) {
      this.categoria = new Categoria(frmCategoriaValue.txtNombre.valueOf());
    }
    this.categoriaService.agregarCategoria(this.categoria).subscribe(respuesta=>{
      console.log(respuesta);
      this.mensaje = "Categoria agregada correctamente";
      this.router.navigate(["/", "listar-categorias"]);
    }, error => {
      console.log(error);
      this.mensaje = "Problemas al agregar categoria!!";
      this.frmCategoria.reset();
    });
  }

  obtenerCategorias(){
    this.categoriaService.listarCategorias().subscribe(data => {
      console.log(data);
      this.listaCategorias = data;
    }, error => {
      console.log(error);
    })
  }
}
