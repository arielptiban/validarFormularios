    export function valida (input){

        const tipoInput = input.dataset.tipo

        if (validadores[tipoInput]){
            validadores[tipoInput](input)
        }

        if(input.validity.valid){
            input.parentElement.classList.remove("input-container--invalid")
            input.parentElement.querySelector(".input-message-error").innerHTML = ""
        }
        else{
            input.parentElement.classList.add("input-container--invalid");
            input.parentElement.querySelector(".input-message-error").innerHTML = mostrarError(tipoInput, input)
        }

    }

    const tipoErrores = [ 
        "valueMissing",
        "typeMismatch",
        "patternMismatch",
        "customError"
    ]

    const mensajesError = {
        nombre: {
            valueMissing: "Este campo no puede estar vacío"
        },
        email:{
            valueMissing: "Este campo no puede estar vacío",
            typeMismatch: "El formato del correo no es correcto"
        },
        password:{
            valueMissing: "Este campo no puede estar vacío",
            patternMismatch: "Al menos 6 caracteres, máxmimo 13, debe contener una letra minúscula, una letra mayúscula, un número, y no puede contener caracteres especiales"
        },
        nacimiento:{
            valueMissing: "Este campo no puede estar vacío",
            customError: "Debes tener almenos 18 años de edad"
        },
        numero:{
            valueMissing: "Este campo no puede estar vacío",
            patternMismatch:"El formato requerido es XXXXXXXXXX 10 numeros"
        },
        direccion:{
            valueMissing: "Este campo no puede estar vacío",
            patternMismatch:"Este campo debe contener entre 10 a 40 caracteres"
        },
        ciudad:{
            valueMissing: "Este campo no puede estar vacío",
            patternMismatch:"Este campo debe contener entre 10 a 40 caracteres"
        },
        estado:{
            valueMissing: "Este campo no puede estar vacío",
            patternMismatch:"Este campo debe contener entre 10 a 40 caracteres"
        },

    }

    const validadores = {
        nacimiento: input => validarNacimiento(input)
    }
    
    function mostrarError(tipoInput, input){
        let mensaje = ""
        
        tipoErrores.forEach( error =>{
            if(input.validity[error]){
                mensaje = mensajesError[tipoInput][error]
            }
        })

        return mensaje
    }

    function validarNacimiento(input){
        const fechaCliente = new Date(input.value)
        let mensajeError = "";

        if (!mayorEdad(fechaCliente)){
            mensajeError = "Debes tener almenos 18 años de edad"
        }

        input.setCustomValidity(mensajeError);
    }

    function mayorEdad(fecha){
        const fechaAtual = new Date();
        const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
       return( diferenciaFechas <= fechaAtual)
    }