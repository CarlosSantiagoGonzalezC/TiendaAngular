import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = "http://santiagocuellar27.pythonanywhere.com/producto";

  constructor(private http: HttpClient) { }

  listarProductos(): Observable<any>{
    return this.http.get(this.url);
  }

  getProducto(id: String): Observable<any>{
    return this.http.get(this.url+"/"+id);
  }

  eliminarProducto(id: String): Observable<any>{
    return this.http.delete(this.url+"/"+id);
  }

  agregarProducto(producto: any): Observable<any>{
    return this.http.post(this.url, producto);
  }

  editarProducto(id: String, producto: any): Observable<any>{
    return this.http.put(this.url+"/"+id, producto);
  }
}
