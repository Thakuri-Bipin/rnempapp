
export const initState = {
    data:[],
    loading:true
}

//using context API 
export const reducer = (state, action) => {
    if (action.type == "ADD_DATA")
    {
        return {
            //overriding initstate with data from dispatch in home js
            ...state,
            data:action.payload
        }
    }
    if (action.type == "SET_LOADING")
    {
        return {
            //overriding initstate with data from dispatch in home js
            ...state,
            loading:action.payload
        }
    }
    //whatever is returned, is central store (redux)
    return state
}