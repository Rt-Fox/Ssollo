
const SET_ORDER_ID_CALC = 'SET_ORDER_ID_CALC'
const SET_DEPOSIT = 'SET_DEPOSIT'
const SET_DELAY = 'SET_DELAY'
const SET_SUM = 'SET_SUM'
const SET_CALC_FORM = 'SET_CALC_FORM'
const SET_FUEL_BEFORE = 'SET_FUEL_BEFORE'
const SET_FUEL_AFTER = 'SET_FUEL_AFTER'
const SET_FUEL_PRICE = 'SET_FUEL_PRICE'

const SET_MILEAGE_BEFORE = 'SET_MILEAGE_BEFORE'
const SET_MILEAGE_AFTER = 'SET_MILEAGE_AFTER'
const SET_MILEAGE_PRICE = 'SET_MILEAGE_PRICE'

const SET_IMG_BEFORE = 'SET_IMG_BEFORE'
const SET_IMG_AFTER = 'SET_IMG_AFTER'

const CLEAR_FORM_CALCULATION = 'CLEAR_FORM_CALCULATION'
const SET_CALC_LIST = 'SET_CALC_LIST'

const defaultState = {
    order_id: null,
    deposit: null,
    delay: null,
    fuel_before: null,
    fuel_after: null,
    fuel_price: null,
    mileage_before: null,
    mileage_after: null,
    sum_for_mileage_over: 0,
    img_before: null,
    img_before_name: '',
    img_after: null,
    img_after_name: '',
    sum_one: null,
    sum_two: null,
    balance: null,
    list: []
}

export const calculationReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_CALC_FORM:
            return {
                ...state,
                id: action.payload.id,
                sum_for_mileage_over: action.payload.sum_for_mileage_over,
                order_id: action.payload.order_id,
                deposit: action.payload.deposit,
                delay: action.payload.delay,
                fuel_before: action.payload.fuel_before,
                fuel_after: action.payload.fuel_after,
                mileage_before: action.payload.mileage_before,
                mileage_after: action.payload.mileage_after,
                img_before: action.payload.img_before,
                img_before_name: action.payload.img_before_name,
                img_after: action.payload.img_after,
                img_after_name: action.payload.img_after_name,
                list: action.payload.list
            }
        case SET_ORDER_ID_CALC:
            return {
                ...state,
                order_id: action.payload
            }
        case SET_DEPOSIT:
            return {
                ...state,
                deposit: action.payload
            }
        case SET_DELAY:
            return {
                ...state,
                delay: action.payload
            }
        case SET_SUM:
            return {
                ...state,
                sum_one: action.payload.sum_one,
                sum_two: action.payload.sum_two,
                balance: action.payload.balance
            }
        case SET_FUEL_BEFORE:
            return {
                ...state,
                fuel_before: action.payload
            }
        case SET_FUEL_AFTER:
            return {
                ...state,
                fuel_after: action.payload
            }
        case SET_IMG_BEFORE:
            return {
                ...state,
                img_before: action.payload.file,
                img_before_name: action.payload.name
            }
        case SET_IMG_AFTER:
            return {
                ...state,
                img_after: action.payload.file,
                img_after_name: action.payload.name
            }
        case SET_FUEL_PRICE:
            return {
                ...state,
                fuel_price: action.payload
            }
        case SET_MILEAGE_BEFORE:
            return {
                ...state,
                mileage_before: action.payload
            }
        case SET_MILEAGE_AFTER:
            return {
                ...state,
                mileage_after: action.payload
            }
        case SET_MILEAGE_PRICE:
            return {
                ...state,
                sum_for_mileage_over: action.payload
            }
        case SET_CALC_LIST:
            return {
                ...state,
                list: action.payload
            }
        case CLEAR_FORM_CALCULATION:
            return {
                ...defaultState
            }
        default:
            return state
    }

}


export const setOrderIdCalc = (payload) => { return { type: SET_ORDER_ID_CALC, payload } }
export const setDeposit = (payload) => { return { type: SET_DEPOSIT, payload } }
export const setSum = (payload) => { return { type: SET_SUM, payload } }
export const setCalcForm = (payload) => { return { type: SET_CALC_FORM, payload } }
export const setDelay = (payload) => { return { type: SET_DELAY, payload } }
export const setFuelBefore = (payload) => { return { type: SET_FUEL_BEFORE, payload } }
export const setFuelAfter = (payload) => { return { type: SET_FUEL_AFTER, payload } }
export const setImgBefore = (payload) => { return { type: SET_IMG_BEFORE, payload } }
export const setImgAfter = (payload) => { return { type: SET_IMG_AFTER, payload } }
export const setFuelPrice = (payload) => { return { type: SET_FUEL_PRICE, payload } }
export const setMileageBefore = (payload) => { return { type: SET_MILEAGE_BEFORE, payload } }
export const setMileageAfter = (payload) => { return { type: SET_MILEAGE_AFTER, payload } }
export const setMileagePrice = (payload) => { return { type: SET_MILEAGE_PRICE, payload } }
export const setCalcList = (payload) => { return { type: SET_CALC_LIST, payload } }
export const clearCalculateForm = (payload) => { return { type: CLEAR_FORM_CALCULATION, payload } }
