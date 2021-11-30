const SET_PLACE = "SET_PLACE"
const SET_PLACE_NAME = "SET_PLACE_NAME"
const CLEAR_FORM = "CLEAR_FORM"


const defaultState = {
    id: null,
    name: '',
}

export const placeFormReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PLACE:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name
            }
        case SET_PLACE_NAME:
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
export const setPlaceForm = (payload) => { return { type: SET_PLACE, payload } }
export const setPlaceNameForm = (payload) => { return { type: SET_PLACE_NAME, payload } }
export const clearPlaceForm = () => { return { type: CLEAR_FORM } }