import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  datatableElement2: DataTableDirective;
  data:any = [];
  new:any = [];
  dtOptions2: DataTables.Settings = {};
  dtTrigger2 = new Subject();
  dtOptions3: DataTables.Settings = {};
  dtTrigger3 = new Subject();
  form: FormGroup;
  lista = [
    {house: "gryffindor"},
    {house: "slytherin"},
    {house: "ravenclaw"}, 
    {house: "hufflepuff"}
  ];
  Initialized:boolean = false
  fecha:any;
  router: any;

  constructor(private _generalservice:GeneralService, private f: FormBuilder) {
    this.createForm();
  }

  // CATPURADORES DE EVENTOS
  get nombreNoVal(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched
  }
  get patronusNoVal(){
    return this.form.get('patronus').invalid && this.form.get('patronus').touched
  }
  get edadNoVal(){
    return this.form.get('edad').invalid && this.form.get('edad').touched
  }

  // VALIDADORES DE UNICAMENTE REQUERIDOS
  createForm(){
    this.form = this.f.group({
      nombre: ['', [Validators.required]],
      patronus: ['', [Validators.required]],
      edad: ['', [Validators.required]],
    });
  }

  // VALIDADOR TOUCHED // ALMACENAMIENTO DE DATOS EN EL LOCALSTORAGE
  save(){
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
    this.new.push(this.form.value);
    localStorage.setItem('data', '');
    localStorage.setItem('data', JSON.stringify(this.new));
    this.form.reset();
  }

  // TRAER LOS DATOS DEL LOCALSTOPRAGE PARA MOSTRARLOS EN LA VISTA DE ESTUDIANTES NUEVOS
  getNewStudents(){
    if(localStorage.getItem('data')){
      this.new = JSON.parse(localStorage.getItem('data'));
    }
  }

  // CONFIGURACIÓN DE OPCIONES DE DATATABLES
  ngOnInit(): void {
    this.dtOptions2 = {
      searching: false,
      pagingType: 'full_numbers',
      lengthMenu: [[3, 5, -1], [3, 5, "Todos"]],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.staff();
    this.getNewStudents();
  }

  // SUBSCRIPCIÓN DE LA PETICIÓN GETSTUDENTS Y PASARLOS A LA VISTA CON LA REINIZIALIZACIÓN DE DATATABLES
  staff(): void {
    this._generalservice.getStudents()
      .subscribe((res:any) => {
        this.data = res;
        const fecha = new Date();
        this.fecha = fecha.getFullYear();
        if(this.Initialized){
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) =>{
            dtInstance.destroy();  
            this.dtTrigger2.next();
          })
        }else{
          this.Initialized = true;
          this.dtTrigger2.next();
        }
      }); 
  }
}
