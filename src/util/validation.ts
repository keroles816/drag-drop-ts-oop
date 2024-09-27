

namespace App {
    

export  interface validatable {
    value: string | number;
    reqired?: boolean;
    minLength?: number;
    maxLength?:number 
    min?: number;
    max?: number;
   }
     

    export  function Validate(validatableInput:validatable){
     let isValid=true;

     if(validatableInput.reqired){
         isValid=isValid && 
         validatableInput.value.toString().trim().length!==0;
    }

    if(validatableInput.minLength !=null && 
      typeof validatableInput.value==='string'){

       isValid=isValid && validatableInput.value.length >
        validatableInput.minLength
     }

     if(validatableInput.maxLength !=null && 
      typeof validatableInput.value==='string'){
        
       isValid=isValid && validatableInput.value.length <
        validatableInput.maxLength
     }

     if(validatableInput.min != null && typeof validatableInput.value === 'number') {

      isValid= isValid && validatableInput.value > validatableInput.min
     }
 

     if(validatableInput.max != null && typeof validatableInput.value === 'number') {

      isValid= isValid && validatableInput.value < validatableInput.max
     }
 

     return isValid;

   }
}