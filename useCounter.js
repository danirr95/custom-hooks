import { useState } from "react"


//Creacion de customHook
export const useCounter = (initialValue = 10) => {

    const [counter, setCounter] = useState(initialValue);

    //Función creada que será quien llame al setCounter
    //Hace las funciones de un getter del setCounter para los demas componentes que deseen usar el setCounter
    const increment = (cant = 1) => {
        setCounter(counter + cant);
    }

    //Función creada para resetear (getter)
    const reseter = () => {
        setCounter(initialValue);
    }

    //Función para decrementar (getter)
    const decrement = (cant = 1) => {
        //Si es exactamente igual a 0 se sale. Ej: carrito de compra no puede tener menos de 0 artículos
        if (counter === 0) return;
        setCounter(counter - cant);
    }

    return {
        counter,
        increment,
        reseter,
        decrement
    }
}