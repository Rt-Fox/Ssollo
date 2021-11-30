const SET_SERVICE = "SET_SERVICE"
const SET_SERVICE_PRICE = "SET_SERVICE_PRICE"
const SET_SERVICE_NAME = "SET_SERVICE_NAME"
const CLEAR_FORM = "CLEAR_FORM"


const defaultState = {
    price: null,
    name: '',
    id: null
}

export const serviceFormReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SERVICE:
            return {
                ...state,
                price: action.payload.price,
                name: action.payload.name,
                id: action.payload.id
            }
        case SET_SERVICE_PRICE:
            return {
                ...state,
                price: action.payload,
            }
        case SET_SERVICE_NAME:
            return {
                ...state,
                name: action.payload,
            }
        case CLEAR_FORM:
            return {
                ...defaultState
            }
        default:
            return state
    }
}
export const setServiceForm = (payload) => { return { type: SET_SERVICE, payload } }
export const setServicePrice = (payload) => { return { type: SET_SERVICE_PRICE, payload } }
export const setServiceName = (payload) => { return { type: SET_SERVICE_NAME, payload } }
export const clearServiceForm = () => { return { type: CLEAR_FORM } }