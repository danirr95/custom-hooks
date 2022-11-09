import { TodoList } from "./TodoList";

//Creamos nuestra función dispatch del que usaremos en el reducer, recibe el estado inicial y su función de acción
export const todoReducer = (initialState = [], action) => {

    //Escogemos un switch para realizar la action oportuna según el tipo de action que se le pase a la function
    //Siempre debemos devolver en cualquier caso el state, ya sea el original sin cambios o el nuevo state modificado
    switch (action.type) {
        //En el caso de que la propiedad 'type' del action sea 'Add Todo'
        case '[TODO] Add Todo':
            //Retornamos todos los todos almacenamos actualmente en el state, mas el todo proporcionado por el payload del action que invoca la función del todoReducer
            return [
                ...initialState,
                action.payload
            ]

        //En el caso de que la propiedad 'type' del action sea 'Remove Todo'
        case '[TODO] Remove Todo':
            //Usamos filter() que devuelve un nuevo array con todos los elementos que cumplan la condición que le pasemos por argumento, en este caso, devolverá un array con aquellos elemenos cuya 'id' NO coincida con la 'id' proporcionada en el payload de la 'action'
            return initialState.filter(todo => todo.id !== action.payload);

        case '[TODO] Toggle Todo':
            //Mapeamos todo el array de todos, el metodo map modifica el elemento que encuentre que coincida con los requisitos que le indiquemos
            return initialState.map(todo => {
                //Si coincide con los requisitios indicados (que su id coincida con el id que se le pasa a traves del payload)
                if (todo.id === action.payload) {
                    //Si coincide el todo pasado en el payload con el todo que detecta el map, dejamos todas las propiedades del todo tal y como están y cambiamos solo su propiedad done, que le colocamos el valor contrario para así poder cambiar de completado a pendiente y viceversa
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                //Se retornan tal y como estaban  todos aquellos 'todos' a los que no se cambie su propiedad done
                return todo;
            })

        //En el caso de no tener aún esta funcionalidad implementada, podemos devolver un error -> throw new Error('Action.type = ABC no está implementada');

        //Si ningún type coincide con los que tenemos previstos, devolvemos el state tal y como esta sin modificaciones
        default:
            return initialState;
    }

}