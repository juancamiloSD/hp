import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
// CONSTRUCCIÓN DE LA VISTA DE PERSONAJES QUE CORRESPONDE A UN FILTRO DE CASAS
export class HouseComponent implements OnInit {

  // DEFINICIONES DE VARIABLES PARA EL FUNCIONAMIENTO DE DATATABLES
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  dtOptions1: DataTables.Settings = {};
  dtTrigger1 = new Subject();
  Initialized:boolean = false

  // VARIABLES DEFINIDAS PARA OBTENER VALORES ESTABLECIENDO UN ARRAY VACIO
  data:any = [];
  dataStaff:any = [];
  seleccionado:any = [];
  fecha:any;

  // LISTA DE DESPLEGABLE PARA FUNCIONAMIENTO DEL FILTRO
  lista = [
    {house: "gryffindor"},
    {house: "slytherin"},
    {house: "ravenclaw"}, 
    {house: "hufflepuff"}
  ];

  constructor(private _generalservice:GeneralService) { }

  // INICIALIZACIÓN DEL DATATABLES DEFINIENDO LAS OPCIONES
  ngOnInit(): void {
    this.dtOptions1 = {
      searching: false,
      pagingType: 'full_numbers',
      lengthMenu: [[3, 5, -1], [3, 5, "Todos"]],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };

    // FUNCIÓN DONDE SE LE PASA COMO PARAMETRO EL VALOR DEL FILTRO DEFINIENDOLO COMO DEFAULT LA PRIMERA CASA
    this.capturarPersonajes(this.seleccionado = 'gryffindor');
  }

  // FUNCIÓN DONDE SE HACE LA SUBSCRIPCIÓN DE LA PETICIÓN HTTP DE LOS WEBSERVICES GETHOUSE
  capturarPersonajes(seleccionado): void {
    this._generalservice.getHouse(seleccionado)
      .subscribe((res:any) => {
        this.data = res;
        const fecha = new Date();
        this.fecha = fecha.getFullYear();

        // REINICIALIZACIÓN DE DATATABLES
        if(this.Initialized){
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) =>{
            dtInstance.destroy();  
            this.dtTrigger1.next();
          })
        }else{
          this.Initialized = true;
          this.dtTrigger1.next();
        }
      }); 
  }
}
