import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  data:any = [];
  dtOptions3: DataTables.Settings = {};
  dtTrigger3 = new Subject();
  lista = [
    {house: "gryffindor"},
    {house: "slytherin"},
    {house: "ravenclaw"}, 
    {house: "hufflepuff"}
  ];
  Initialized:boolean = false
  fecha:any;

  // CONSTRUCCIÓN DE LA VISTA DE PROFESORES QUE CORRESPONDE A UN FILTRO DE CASAS
  constructor(private _generalservice:GeneralService) { }

  // INICIALIZACIÓN DEL DATATABLES DEFINIENDO LAS OPCIONES
  ngOnInit(): void {
    this.dtOptions3 = {
      searching: false,
      pagingType: 'full_numbers',
      lengthMenu: [[3, 5, -1], [3, 5, "Todos"]],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    
    // LLAMADO DE LA FUNCIÓN PARA QUE SE EJECUTE LA SUBSCRIPCIÓN
    this.staff();
  }

  // FUNCIÓN DONDE SE HACE LA SUBSCRIPCIÓN DE LA PETICIÓN HTTP DE LOS WEBSERVICES GETSTAFF
  staff(): void {
    this._generalservice.getStaff()
      .subscribe((res:any) => {
        this.data = res;
        const fecha = new Date();
        this.fecha = fecha.getFullYear();
        if(this.Initialized){
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) =>{
            dtInstance.destroy();  
            this.dtTrigger3.next();
          })
        }else{
          this.Initialized = true;
          this.dtTrigger3.next();
        }
      }); 
  }
}
