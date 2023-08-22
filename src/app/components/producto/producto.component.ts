import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public frmProducto!: FormGroup;
  public producto!: Producto;
  public mensaje: string = '';
  listaCategorias: any;
  rutaFoto: any;

  constructor(private location: Location, private productoService: ProductoService,
    private categoriaService: CategoriaService, private router: Router) {
  }

  ngOnInit(): void {
    this.listarCategorias();
    this.frmProducto = new FormGroup({
      txtCodigo: new FormControl('', [Validators.required]),
      txtNombre: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      txtPrecio: new FormControl('', [Validators.required]),
      cbCategoria: new FormControl('', [Validators.required]),
      fileFoto: new FormControl('',),
    });
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((result) => {
      this.listaCategorias = result;
    })
  }

  agregarProducto(frmProductoValue: any) {
    const formData = new FormData();

    if (this.frmProducto.valid) {
      var codigo = frmProductoValue.txtCodigo;
      var nombre = frmProductoValue.txtNombre;
      var precio = frmProductoValue.txtPrecio;
      var categoria = frmProductoValue.cbCategoria;
      var foto = frmProductoValue.fileFoto;
      formData.append('proCodigo', codigo);
      formData.append('proNombre', nombre);
      formData.append('proPrecio', precio);
      formData.append('proCategoria', categoria);
      formData.append('proFoto', this.frmProducto.get('fileFoto')?.value);
      this.producto = new Producto(codigo, nombre, precio, categoria, foto);
    }
    this.productoService.agregarProducto(formData).subscribe(respuesta => {
      console.log(this.producto);
      console.log(respuesta);
      this.mensaje = "Producto agregado correctamente";
      this.router.navigate(["/", "listar-productos"]);
    }, error => {
      console.log(error);
      this.mensaje = "Problemas al agregar producto!!";
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rutaFoto = URL.createObjectURL(file);
      this.frmProducto.get('fileFoto')?.setValue(file);
    }
  }
}
