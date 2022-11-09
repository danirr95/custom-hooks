import { useState } from "react";

//Nuestro custom hook para manejar formularios, recibe por argumento un objeto formado por los datos del formulario
export const useForm = (initialForm = {}) => {

    //Creamos el useState según el objeto de formulario que se le pase al customHook por argumento
    const [formState, setFormState] = useState(initialForm);

    //Funcion para cambiar el valor del stateForm desde fuera (hace como getter)
    //Recibe el evento en bruto desde el elemento que lo invoca, en este caso, un input. Desestructuramos el target de dicho evento
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        //Invocamos el modificador del contenido del formState, le decimos que deje todos los valores como estaban (con el operador spread) y que añada un anueva propiedad cuyo nombre será el 'name' (propiedad 'name') del elemento que invoca a la función onInputChange, y le introduzca el value proveniente del evento recibido desde el input
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //Funcion que devuelve el form a su estado original tras pulsar el boton de reset
    const onResetForm = () => {
        setFormState(initialForm);
    }

    //Retornamos todos los datos que tuviera el form de forma original, así como los nuevos datos, la función del inputChange que agrega datos al state del formulario, y la funcion ResetForm que limpia y resetea el formulario
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }

}
