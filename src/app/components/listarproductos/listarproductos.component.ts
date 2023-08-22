import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Producto } from 'src/app/models/producto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listarproductos',
  templateUrl: './listarproductos.component.html',
  styleUrls: ['./listarproductos.component.css']
})
export class ListarproductosComponent implements OnInit {
  public frmProducto!: FormGroup;
  public producto!: Producto;
  public mensaje: string = '';
  public codigoConsultado: string = '';
  public nombreConsultado: string = '';
  public precioConsultado: string = '';
  public categoriaConsultado: string = '';
  public fotoConsultado: string = '';
  listaProductos: any;
  listaProducto: any;
  listaCategorias: any;
  display = "none";
  idProducto: any;
  url: any;
  rutaFoto: any;

  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router) {
    this.url = "http://santiagocuellar27.pythonanywhere.com/media/fotos";
  }

  obtenerProductos() {
    this.productoService.listarProductos().subscribe((result) => {
      this.listaProductos = result;
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
    this.idProducto = id;
  }

  eliminarProducto() {
    this.productoService.eliminarProducto(this.idProducto).subscribe((result) => {
      this.obtenerProductos();
    }, error => {
      console.log(error);
    });
    this.cerrarModal();
  }

  ngOnInit(): void {
    this.listarCategorias();
    this.obtenerProductos();
    this.frmProducto = new FormGroup({
      txtCodigo: new FormControl('', [Validators.required]),
      txtNombre: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      txtPrecio: new FormControl('', [Validators.required]),
      cbCategoria: new FormControl('', [Validators.required]),
      fileFoto: new FormControl('',),
    });
  }

  abrirModalActualizar(id: number) {
    this.display = "block";
    this.idProducto = id;
  }

  actualizarProducto(frmProductoValue: any) {
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
    this.productoService.editarProducto(this.idProducto, formData).subscribe(respuesta => {
      console.log(respuesta);
      this.mensaje = "Producto actualizado correctamente";
      window.location.reload();
    }, error => {
      console.log(error);
      this.mensaje = "Problemas al actualizar producto!!";
    });
  }

  obtenerProducto(id: String) {
    this.productoService.getProducto(id).subscribe((result) => {
      this.listaProducto = Object.values(result);
      this.codigoConsultado = this.listaProducto[1];
      this.nombreConsultado = this.listaProducto[2];
      this.precioConsultado = this.listaProducto[3];
      this.categoriaConsultado = this.listaProducto[4];
      this.rutaFoto = this.listaProducto[5];
    })
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rutaFoto = URL.createObjectURL(file);
      this.frmProducto.get('fileFoto')?.setValue(file);
    }
  }
}
