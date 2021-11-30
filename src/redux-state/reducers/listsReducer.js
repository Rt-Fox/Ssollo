
const SET_USERS = "SET_USERS"
const SET_FIRMS = "SET_FIRMS"
const SET_MANAGERS = "SET_MANAGERS"
const SET_PLACES = "SET_PLACES"
const SET_TERRITORIES = "SET_TERRITORIES"
const SET_CARS = "SET_CARS"
const SET_ACTIVE_CAR = "SET_ACTIVE_CAR"
const CLEAR_ACTIVE_CAR = "CLEAR_ACTIVE_CAR"
const SET_SERVICES = "SET_SERVICES"

const defaultState = {
    users: [],
    firms: [],
    managers: [],
    places: [],
    territories: [],
    cars: [],
    active_car: null,
    services: []
}


export const listsReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_FIRMS:
            return {
                ...state,
                firms: action.payload
            }
        case SET_MANAGERS:
            return {
                ...state,
                managers: action.payload
            }
        case SET_PLACES:
            return {
                ...state,
                places: action.payload
            }
        case SET_TERRITORIES:
            return {
                ...state,
                territories: action.payload
            }
        case SET_CARS:
            return {
                ...state,
                cars: action.payload
            }
        case SET_SERVICES:
            return {
                ...state,
                services: action.payload
            }
        case SET_ACTIVE_CAR:
            return {
                ...state,
                active_car: action.payload
            }
        case CLEAR_ACTIVE_CAR:
            return {
                ...state,
                active_car: null
            }

        default:
            return state
    }

}


export const setUsers = (payload) => { return { type: SET_USERS, payload } }
export const setFirms = (payload) => { return { type: SET_FIRMS, payload } }
export const setManagers = (payload) => { return { type: SET_MANAGERS, payload } }
export const setPlaces = (payload) => { return { type: SET_PLACES, payload } }
export const setTerritories = (payload) => { return { type: SET_TERRITORIES, payload } }
export const setCars = (payload) => { return { type: SET_CARS, payload } }
export const setActiveCar = (payload) => { return { type: SET_ACTIVE_CAR, payload } }
export const clearActiveCar = () => { return { type: CLEAR_ACTIVE_CAR } }
export const setServices = (payload) => { return { type: SET_SERVICES, payload } }
