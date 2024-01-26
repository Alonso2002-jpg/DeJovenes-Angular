import {AbstractControl, ValidationErrors} from "@angular/forms";

export class MyValidators {
  static validateDNINIE(control: AbstractControl): ValidationErrors| null{
    let DNI_REGEX = /^(\d{8})([A-Z])$/;
    let NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;
    if(control.value == ""){
      return null;
    }else if (control.value.match(DNI_REGEX)){
      return null;
    }else if (control.value.match(NIE_REGEX)){
      return null;
    }else {
      return {DNINIE: true};
    }
  }

  static validateFechaNac(control: AbstractControl): ValidationErrors| null{
    const fechaNacimiento = control.value.trim();

    // Expresión regular para validar el formato DD/MM/AAAA
    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (regex.test(fechaNacimiento)) {
      const fecha = control.value.split('/');
      try {
        const fechaObtenida = new Date(parseInt(fecha[2], 10), parseInt(fecha[1], 10) - 1, parseInt(fecha[0], 10));
        if (fechaObtenida > new Date()) {
          return {fechaNac: true};
        }
        return null
      }catch (err){
        return {fechaNac: true};
      }
    } else {
      return {fechaNac: true};
    }
  }

  static validateFotoDNIE(control: AbstractControl): ValidationErrors| null{
    const ext = control.value.split('.').pop();
    if (ext=='' || ext!='jpg' ) {
      return {fileDNIE: true};
    } else {
      return null
    }
  }
}
