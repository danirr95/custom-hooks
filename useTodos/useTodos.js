import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

//Creamos un initialState vacío para que el contenido sea servido por la función de iniciación 'init'
//const initialState = [];

//Creamos la funcion que se ejecutará cuando se inicie nuestro useReducer, la cual obtendrá los 'todos' almacenados en nuestro localStorage
const init = () => {
    //Retornamos el parseado de string a objeto JSON de los 'todos' almacenados en nuestro localStorage
    //getItem recibe el nombre con el cual ha sido almacenada la 'key' que deseamos recuperar
    //En el caso de que no haya 'todos' almacenados, devolvemos un array vacío
    return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {

    //Desestructuramos del useReducer el state retornado y la funcion despachadora(en este caso es todoReducer)
    //useReducer recibe la función manejadora de todas las actions que le lleguen (todoReducer), el estado inicial (initialState) y, en este caso, tambien una función que indica el contenido inicial de dicho initialState (init)
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    //Usamos un useEffect para realizar un 'efecto secundario', que en este caso es almacenar los 'todos' en nuestro localStorage
    useEffect(() => {
        //setItem recibe el nombre que tendrá la nueva 'key' creada, y los valores a almacenar dentro de dicha 'key', en nuestro debemos transformar en strings los valores del array de todos
        localStorage.setItem("todos", JSON.stringify(todos));
        //Nuestro useEffect (almacenamiento) se volverá a ejecutar cada que vez que cambie el array de todos
    }, [todos]);

    //Funcion que le pasamos al componente TodoAdd (encargado de añadir todos a la lista de todos). Dicha función se encarga de manejar los todos que se le pasan desde dentro del componente TodoAdd
    const handleNewTodo = (todo) => {
        //creamos el objeto 'action' que indicara que se debe añadir un todo, dicho todo a añadir es pasado dentro de la propiedad 'payload' de la action
        const action = {
            type: "[TODO] Add Todo",
            payload: todo,
        };
        //Funcion dispatch que trae de forma predeterminada el useReducer, esta funcion se encarga de pasarle al useReducer la action que deseamos llevar a cabo sobre nuestro state, una vez que el useReducer recibe la action mediante el dispatch, le pasa dicha action a su manejador de actions, en este caso, al todoReducer
        dispatch(action);
    };

    //Función manejadora de la eliminacion del todo
    const handleDeleteTodo = (id) => {
        //Podemos directamente declarar la 'action' dentro de la llamada a la función despachadora de actions
        //En este caso el type será el tipo elegido para indicar que deseamos eliminar un 'todo' y el payload para identificar dicho 'todo' será su 'id'
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });
    };

    //Función manejadora del mensaje de completado o pendiente, así como del tachado del todo
    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    }

    //EXPERIMENT
    let pendientes = 0;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].done === false) {
            pendientes += 1;
        }
    }
    //EXPERIMENT

    //Retornamos un objeto con los elementos necesarios a exportar
    return {
        todos,
        totales: todos.length,
        pendientes,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
} 