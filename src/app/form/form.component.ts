import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyValidators} from "../validations/my-validators";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  provincias : string [] = ['',
    "Álava", "Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Baleares",
    "Barcelona", "Burgos", "Cáceres", "Cádiz", "Castellón", "Ciudad Real", "Córdoba",
    "La Coruña", "Cuenca", "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva",
    "Huesca", "Jaén", "León", "Lérida", "La Rioja", "Lugo", "Madrid", "Málaga", "Murcia",
    "Navarra", "Orense", "Asturias", "Palencia", "Las Palmas", "Pontevedra",
    "Salamanca", "Santa Cruz de Tenerife", "Cantabria", "Segovia", "Sevilla", "Soria",
    "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora",
    "Zaragoza", "Ceuta", "Melilla"
  ]

  provincia = ""

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
    dninie: new FormControl('', [Validators.required, MyValidators.validateDNINIE]),
    fechaNac: new FormControl('', [Validators.required, MyValidators.validateFechaNac]),
    fileDNIE: new FormControl('',[Validators.required, MyValidators.validateFotoDNIE]),
    gender: new FormControl('', [Validators.required]),
    intereses: new FormControl('', [Validators.required]),
    codPostal: new FormControl('',[Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('^[0-9]*$')]),
    actualSit: new FormControl('-', [Validators.required]),
    terminos: new FormControl('', [Validators.requiredTrue]),
  })

  actualizarProvincia(){
    let codigoPostal: number = this.formRegister.value.codPostal?.length == 5 ? Number(this.formRegister.value.codPostal?.substring(0,2)) : 0;
    this.provincia = codigoPostal != 0 ? this.provincias[codigoPostal] : "Codigo Equivocado";
  }

  resetForm(){
    this.formRegister.reset();
  }

  submit(){
    let mens : string = "";
    if(this.formRegister.valid){
      mens += `Nombre: ${this.formRegister.value.name}\n`
      mens += `Apellidos: ${this.formRegister.value.lastname}\n`
      mens += `DNI: ${this.formRegister.value.dninie}\n`
      mens += `Fecha Nacimiento: ${this.formRegister.value.fechaNac}\n`
      mens += `Sexo: ${this.formRegister.value.gender}\n`
      mens += `Imagen DNI: ${this.formRegister.value.fileDNIE}\n`
      mens += `Intereses: ${this.formRegister.value.intereses}\n`
      mens += `Codigo postal: ${this.formRegister.value.codPostal}\n`
      mens += `Provincia: ${this.provincia}\n`
      mens += `Situacion actual: ${this.formRegister.value.actualSit}\n`
      mens += `Condiciones: Aceptadas`
      alert(mens)
    } else {
      alert("Hay datos invalidos en el formulario")
    }
  }
}
