import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/servicios/repository.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(activateRoute: ActivatedRoute, private repositoryService: RepositoryService) { }
  productos: any[] = [];
  categorias: any[] = [];
  public pos: Number;
  public verProductos = true;
  public modificarProducto = false;
  public idModificar:Number;
  public nombreModificar:string;
  public categoriaModificar:string;
  public categoriaProducto:string;
  public precioModificar:Number;

  ngOnInit() {

    this.repositoryService.getModules("productos").subscribe(n => {
      for (let elemento in n) {
        this.productos.push(n[elemento]);
        this.pos = this.categorias.findIndex(m=>m==n[elemento].Tipo);
          if(this.pos<0){
            this.categorias.push(n[elemento].Tipo);
          }
      }
    });
}

cambiarVista(){
  this.verProductos = true;
  this.modificarProducto = false;
}

editarProducto(producto){
  this.verProductos = false;
  this.modificarProducto = true;
  this.idModificar = producto.id;
  this.nombreModificar = producto.nombreCarta;
  this.precioModificar = producto.precio;
  this.categoriaProducto = producto.Tipo;
}

mandarDatosEditar(){
  this.verProductos = true;
  this.modificarProducto = false;
  this.repositoryService.editarProducto("productos",this.idModificar,this.nombreModificar,this.categoriaModificar,this.precioModificar);
  window.location.reload();
}

cambiarCategoriaSeleccionada(cat){
  this.categoriaModificar = cat;
}

}
