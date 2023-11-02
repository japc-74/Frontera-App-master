import { AbstractControl, ValidatorFn } from '@angular/forms';

export class RUTValidator 
{    
    static lastTested: string = "";

    static validRUT = (rut: AbstractControl) => {
        var valor = rut.value.replace(new RegExp('[.]', 'g'),'').replace('-','');

        if(valor == '') return;
        
        
        

        // Aislar Cuerpo y Dígito Verificador
        let cuerpo = valor.slice(0,-1);
        let dv = valor.slice(-1).toUpperCase();
        
        // Formatear RUN
        if(valor != RUTValidator.lastTested)
        {
            RUTValidator.lastTested = valor;   
            rut.setValue(cuerpo.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-'+ dv, {emitEvent:false}); 
        }

        // Si no cumple con el mínimo ej. (n.nnn.nnn)
        if(cuerpo.length < 7) { return {rut:"Muy corto"}; }
        
        // Calcular Dígito Verificador
        let suma = 0;
        let multiplo = 2;

        // Para cada dígito del Cuerpo
        for(let i=1;i<=cuerpo.length;i++) {
        
            // Obtener su Producto con el Múltiplo Correspondiente
            let index = multiplo * valor.charAt(cuerpo.length - i);
            
            // Sumar al Contador General
            suma = suma + index;
            
            // Consolidar Múltiplo dentro del rango [2,7]
            if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    
        }
        
        // Calcular Dígito Verificador en base al Módulo 11
        let dvEsperado = 11 - (suma % 11);
        
        // Casos Especiales (0 y K)
        dv = (dv == 'K')?10:dv;
        dv = (dv == 0)?11:dv;
        
        // Validar que el Cuerpo coincide con su Dígito Verificador
        if(dvEsperado != dv) { return {rut: "Inválido" };  }
    
        // Si todo sale bien, eliminar errores (decretar que es válido)
        //  resolve({});
        return null;
        
    };

    private static validateRut(valor: string) 
    {

    }
}