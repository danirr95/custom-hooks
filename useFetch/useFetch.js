import { useEffect, useState } from "react";

export const useFetch = (url) => {

    //useState que almacena la información recibida por la petición
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null
    });

    //Función fetch normal para hacer la petición fetch a la API de BreakingBad
    const getFetch = async() => {

        //Colocamos todos los elementos del state tal y como estaban menos isLoading para indicar que está cargando la petción
        setState({
            ...state,
            isLoading: true
        });

        const resp = await fetch(url);
        const data = await resp.json();

        setState({
            //data: data,
            data,
            isLoading: false,
            hasError: null
        });
    };

    //useEffect no puede ser usado de forma asíncrona, ya que por norma espera recibir una función pura por argumento
    //Cada vez que cambien la url, se ejecuta la función para realizar una nueva petición
    useEffect(() => {
        getFetch();
    }, [url])

    //Retornamos propiedades con el mismo nombre de las propiedades del state, así podemos ampliarlo en un futuro de forma mas sencilla y mejoramos mucho la lectura del código
    return {
        data:       state.data,
        isLoading:  state.isLoading,
        hasError:   state.hasError
    };
}
