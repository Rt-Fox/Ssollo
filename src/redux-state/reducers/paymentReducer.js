const SET_CLIENT_ID_PAYMENT = 'SET_CLIENT_ID_PAYMENT'
const SET_CAR_ID_PAYMENT = 'SET_CAR_ID_PAYMENT'
const SET_OPERATION_PAYMENT = 'SET_OPERATION_PAYMENT'
const SET_SERVICE_PAYMENT = 'SET_SERVICE_PAYMENT'
const SET_COUNT_PAYMENT = 'SET_COUNT_PAYMENT'
const SET_ACCRUED_PAYMENT = 'SET_ACCRUED_PAYMENT'
const SET_SUM_OF_MONEY_PAYMENT = 'SET_SUM_OF_MONEY_PAYMENT'
const SET_DOC_NUMBER_PAYMENT = 'SET_DOC_NUMBER_PAYMENT'
const SET_FIRM_ID_PAYMENT = 'SET_FIRM_ID_PAYMENT'
const SET_DATE_OF_PAYMENT = 'SET_DATE_OF_PAYMENT'
const SET_ORDER_ID_PAYMENT = 'SET_ORDER_ID_PAYMENT'
const SET_TYPE_PAYMENT = 'SET_TYPE_PAYMENT'
const CLEAR_FORM_PAYMENT = 'CLEAR_FORM_PAYMENT'
const SET_ALL_PAYMENT = 'SET_ALL_PAYMENT'
const SET_USER_INFO = 'SET_USER_INFO'


const defaultState = {
    id: null,
    client_id: null,
    car_id: null,
    operation: '0',
    payment: null,
    count: null,
    is_deposit: false,
    is_deposit_return: false,
    is_main_payment: false,
    service_id: '',
    service_name: '',
    service_price: '',
    sum_of_money: '',
    doc_number: '',
    firm_id: '',
    date_of_payment: '',
    order_id: '',
    user_id: null,
    user_full_name: ''
}


export const paymentReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_ALL_PAYMENT:
            return {
                ...state,
                ...action.payload
            }
        case SET_USER_INFO:
            return {
                ...state,
                user_id: action.payload.id,
                user_full_name: action.payload.full_name
            }
        case SET_CLIENT_ID_PAYMENT:
            return {
                ...state,
                client_id: action.payload
            }
        case SET_CAR_ID_PAYMENT:
            return {
                ...state,
                car_id: action.payload
            }
        case SET_OPERATION_PAYMENT:
            return {
                ...state,
                operation: action.payload
            }
        case SET_SERVICE_PAYMENT:
            return {
                ...state,
                service_id: action.payload.id,
                service_name: action.payload.name,
                service_price: action.payload.price,
            }
        case SET_COUNT_PAYMENT:
            return {
                ...state,
                count: action.payload
            }
        case SET_TYPE_PAYMENT:
            return {
                ...state,
                is_deposit: action.payload.is_deposit,
                is_main_payment: action.payload.is_main_payment,
            }
        case SET_ACCRUED_PAYMENT:
            return {
                ...state,
                payment: action.payload
            }
        case SET_SUM_OF_MONEY_PAYMENT:
            return {
                ...state,
                sum_of_money: action.payload
            }
        case SET_DOC_NUMBER_PAYMENT:
            return {
                ...state,
                doc_number: action.payload
            }
        case SET_FIRM_ID_PAYMENT:
            return {
                ...state,
                firm_id: action.payload,
            }
        case SET_DATE_OF_PAYMENT:
            return {
                ...state,
                date_of_payment: action.payload
            }
        case SET_ORDER_ID_PAYMENT:
            return {
                ...state,
                order_id: action.payload
            }
        case CLEAR_FORM_PAYMENT:
            return {
                ...defaultState
            }
        default:
            return state
    }
}


export const setAllPayment = payload => { return { type: SET_ALL_PAYMENT, payload } }
export const setClientId = payload => { return { type: SET_CLIENT_ID_PAYMENT, payload } }
export const setCarIdPayment = payload => { return { type: SET_CAR_ID_PAYMENT, payload } }
export const setService = payload => { return { type: SET_SERVICE_PAYMENT, payload } }
export const setUserInfo = payload => { return { type: SET_USER_INFO, payload } }
export const setCountPayment = payload => { return { type: SET_COUNT_PAYMENT, payload } }
export const setAccruedPayment = payload => { return { type: SET_ACCRUED_PAYMENT, payload } }
export const setSumOfMoney = payload => { return { type: SET_SUM_OF_MONEY_PAYMENT, payload } }
export const setDocNumber = payload => { return { type: SET_DOC_NUMBER_PAYMENT, payload } }
export const setFirmIdPayment = payload => { return { type: SET_FIRM_ID_PAYMENT, payload } }
export const setDateOfPayment = payload => { return { type: SET_DATE_OF_PAYMENT, payload } }
export const setOrderId = payload => { return { type: SET_ORDER_ID_PAYMENT, payload } }
export const setTypePayment = payload => { return { type: SET_TYPE_PAYMENT, payload } }
export const clearPaymentForm = () => { return { type: CLEAR_FORM_PAYMENT } }