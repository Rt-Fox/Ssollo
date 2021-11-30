const SET_ID_CONTRACT = 'SET_ID_CONTRACT'
const SET_MANAGER_OT_ID = 'SET_MANAGER_OT_ID'
const SET_MANAGER_PR_ID = 'SET_MANAGER_PR_ID'
const SET_PLACE_OT = 'SET_PLACE_OT'
const SET_PLACE_PR = 'SET_PLACE_PR'
const SET_AUTOMIBILE_ID = 'SET_AUTOMIBILE_ID'
const SET_CONTRACT_NUMBER = 'SET_CONTRACT_NUMBER'
const SET_REAL_AUTO_ID = 'SET_REAL_AUTO_ID'
const SET_USER_ID = 'SET_USER_ID'
const SET_RESPRESENTATIVE_FIRST = 'SET_RESPRESENTATIVE_FIRST'
const SET_RESPRESENTATIVE_SECOND = 'SET_RESPRESENTATIVE_SECOND'
const SET_DEP_DATATIME = 'SET_DEP_DATATIME'
const SET_START_DATETIME = 'SET_START_DATETIME'
const SET_END_DATETIME = 'SET_END_DATETIME'
const SET_TARIFF_DATE = 'SET_TARIFF_DATE'
const SET_PAY_DATE = 'SET_PAY_DATE'
const SET_IS_GIVEN = 'SET_IS_GIVEN'
const SET_IS_RETURNED = 'SET_IS_RETURNED'
const SET_DAYS_FIRST = 'SET_DAYS_FIRST'
const SET_DAYS_SECOND = 'SET_DAYS_SECOND'
const SET_DISCOUNDS_PERCENTS = 'SET_DISCOUNDS_PERCENTS'
const SET_DISCOUNT_SUM = 'SET_DISCOUNT_SUM'
const SET_DISCOUNT_REASON = 'SET_DISCOUNT_REASON'
const SET_SUMMA_PROKATA = 'SET_SUMMA_PROKATA'
const SET_TARIFF = 'SET_TARIFF'
const SET_TARIFF_NAME = 'SET_TARIFF_NAME'
const SET_FIRM_ID = 'SET_FIRM_ID'
const SET_TERRITORY = 'SET_TERRITORY'
const SET_COMMENT = 'SET_COMMENT'
const SET_MARKS = 'SET_MARKS'
const SET_CONTRACT_FORM = 'SET_CONTRACT_FORM'
const CLEAR_FORM = 'CLEAR_FORM'



const defaultState = {
    id: '',
    manager_ot_id: null,
    manager_ot_name: '',
    manager_pr_id: null,
    manager_pr_name: '',
    address_gave: '',
    address_gave_id: null,
    address_received: '',
    address_received_id: null,
    automobile_id: null,
    contract_number: null,
    real_auto_id: '',
    gos_number: '',
    auto_name: '',
    user_id: null,
    client_name: '',
    client_phone: '',
    representative_first_id: null,
    representative_first_name: '',
    representative_second_id: null,
    representative_second_name: '',
    start_datetime: '',
    end_datetime: '',
    tariff_date: null,
    is_given: false,
    is_returned: false,
    days_first: null,
    days_second: null,
    pay_date: null,
    discount_percents: null,
    discount_sum: null,
    discount_reason: null,
    summa_prokata: 0,
    tariff: 0,
    tariff_name: '',
    firm_id: null,
    firm_name: '',
    territory_id: null,
    territory_address: '',
    comment: '',
    marks:''
}

export const contractFormReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_ID_CONTRACT:
            return {
                ...state,
                id: action.payload
            }
        case SET_CONTRACT_NUMBER:
            return {
                ...state,
                contract_number: action.payload
            }
        case SET_AUTOMIBILE_ID:
            return {
                ...state,
                automobile_id: action.payload.id,
                tariff_name: action.payload.name,
                tariff: action.payload.tariff
            }
        case SET_MANAGER_OT_ID:
            return {
                ...state,
                manager_ot_id: action.payload.id,
                manager_ot_name: action.payload.full_name
            }
        case SET_MANAGER_PR_ID:
            return {
                ...state,
                manager_pr_id: action.payload.id,
                manager_pr_name: action.payload.full_name
            }

        case SET_PLACE_OT:
            return {
                ...state,
                address_gave_id: action.payload.id,
                address_gave: action.payload.address
            }
        case SET_PLACE_PR:
            return {
                ...state,
                address_received_id: action.payload.id,
                address_received: action.payload.address
            }

        case SET_REAL_AUTO_ID:
            return {
                ...state,
                real_auto_id: action.payload.id,
                gos_number: action.payload.gos_number,
                auto_name: action.payload.name,
            }
        case SET_USER_ID:
            return {
                ...state,
                user_id: action.payload.id,
                client_name: action.payload.name,
                client_phone: action.payload.phone
            }
        case SET_RESPRESENTATIVE_FIRST:
            return {
                ...state,
                representative_first_id: action.payload.id,
                representative_first_name: action.payload.name
            }
        case SET_RESPRESENTATIVE_SECOND:
            return {
                ...state,
                representative_second_id: action.payload.id,
                representative_second_name: action.payload.name
            }
        case SET_DEP_DATATIME:
            return {
                ...state,
                start_datetime: action.payload.start,
                end_datetime: action.payload.end,
                days_first: action.payload.days
            }
        case SET_START_DATETIME:
            return {
                ...state,
                start_datetime: action.payload,
            }
        case SET_END_DATETIME:
            return {
                ...state,
                end_datetime: action.payload
            }
        case SET_DAYS_FIRST:
            return {
                ...state,
                days_first: action.payload
            }
        case SET_DAYS_SECOND:
            return {
                ...state,
                days_second: action.payload
            }
        case SET_TARIFF_DATE:
            return {
                ...state,
                tariff_date: action.payload
            }
        case SET_PAY_DATE:
            return {
                ...state,
                pay_date: action.payload
            }
        case SET_IS_GIVEN:
            return {
                ...state,
                is_given: action.payload
            }
        case SET_IS_RETURNED:
            return {
                ...state,
                is_returned: !state.is_returned
            }
        case SET_DISCOUNDS_PERCENTS:
            return {
                ...state,
                discount_percents: action.payload
            }
        case SET_DISCOUNT_SUM:
            return {
                ...state,
                discount_sum: action.payload
            }
        case SET_DISCOUNT_REASON:
            return {
                ...state,
                discount_reason: action.payload
            }
        case SET_SUMMA_PROKATA:
            return {
                ...state,
                summa_prokata: action.payload
            }
        case SET_TARIFF:
            return {
                ...state,
                tariff: action.payload
            }
        case SET_TARIFF_NAME:
            return {
                ...state,
                tariff_name: action.payload
            }
        case SET_FIRM_ID:
            return {
                ...state,
                firm_id: action.payload.id,
                firm_name: action.payload.name
            }
        case SET_TERRITORY:
            return {
                ...state,
                territory_address: action.payload.address,
                territory_id: action.payload.id,
            }
        case SET_COMMENT:
            return {
                ...state,
                comment: action.payload,
            }
        case SET_MARKS:
            return {
                ...state,
                marks: action.payload,
            }
        case SET_CONTRACT_FORM:
            return {
                ...state,
                id:action.payload.id,
                manager_ot_id: action.payload.manager_ot_id,
                manager_ot_name: action.payload.manager_ot_name,
                manager_pr_id: action.payload.manager_pr_id,
                manager_pr_name: action.payload.manager_pr_name,
                address_gave: action.payload.address_gave,
                address_gave_id: action.payload.address_gave_id,
                address_received: action.payload.address_received,
                address_received_id: action.payload.address_received_id,
                automobile_id: action.payload.automobile_id,
                contract_number: action.payload.contract_number,
                real_auto_id: action.payload.real_auto_id,
                gos_number: action.payload.gos_number,
                auto_name: action.payload.auto_name,
                user_id: action.payload.user_id,
                client_name: action.payload.client_name,
                client_phone: action.payload.client_phone,
                representative_first_id: action.payload.representative_first_id,
                representative_first_name: action.payload.representative_first_name,
                representative_second_id: action.payload.representative_second_id,
                representative_second_name: action.payload.representative_second_name,
                start_datetime: action.payload.start_datetime,
                end_datetime: action.payload.end_datetime,
                tariff_date: action.payload.tariff_date,
                is_given: action.payload.is_given,
                is_returned: action.payload.is_returned,
                days_first: action.payload.days_first,
                days_second: action.payload.days_second,
                pay_date: action.payload.pay_date,
                discount_percents: action.payload.discount_percents,
                discount_sum: action.payload.discount_sum,
                discount_reason: action.payload.discount_reason,
                summa_prokata: action.payload.summa_prokata,
                tariff: action.payload.tariff,
                tariff_name: action.payload.tariff_name,
                firm_id: action.payload.firm_id,
                firm_name: action.payload.firm_name,
                territory_id: action.payload.territory_id,
                territory_address: action.payload.territory_address,
                comment: action.payload.comment,
                marks: action.payload.marks
            }
        case CLEAR_FORM:
            return {
                ...defaultState
            }

        default:
            return state
    }


}

export const setIdContract = (payload) => {return {type: SET_ID_CONTRACT,payload}}
export const setManagerOtId = (payload) => { return { type: SET_MANAGER_OT_ID, payload } }
export const setManagerPrId = (payload) => { return { type: SET_MANAGER_PR_ID, payload } }
export const setPlaceOt = (payload) => { return { type: SET_PLACE_OT, payload } }
export const setPlacePr = (payload) => { return { type: SET_PLACE_PR, payload } }
export const setAutomobileId = (payload) => { return { type: SET_AUTOMIBILE_ID, payload } }
export const setContractNumber = (payload) => { return { type: SET_CONTRACT_NUMBER, payload } }
export const setRealAutoId = (payload) => { return { type: SET_REAL_AUTO_ID, payload } }
export const setUserID = (payload) => { return { type: SET_USER_ID, payload } }
export const setRepresentativeFirst = (payload) => { return { type: SET_RESPRESENTATIVE_FIRST, payload } }
export const setRepresentativeSecond = (payload) => { return { type: SET_RESPRESENTATIVE_SECOND, payload } }
export const setDepDateTime = (payload) => { return { type: SET_DEP_DATATIME, payload } }
export const setStartDateTime = (payload) => { return { type: SET_START_DATETIME, payload } }
export const setEndDatetime = (payload) => { return { type: SET_END_DATETIME, payload } }
export const setTariffDate = (payload) => { return { type: SET_TARIFF_DATE, payload } }
export const setPayDate = (payload) => { return { type: SET_PAY_DATE, payload } }
export const setIsGiven = (payload) => { return { type: SET_IS_GIVEN, payload } }
export const setIsReturned = (payload) => { return { type: SET_IS_RETURNED, payload } }
export const setDaysFirst = (payload) => { return { type: SET_DAYS_FIRST, payload } }
export const setDaysSecond = (payload) => { return { type: SET_DAYS_SECOND, payload } }
export const setDiscountsPercents = (payload) => { return { type: SET_DISCOUNDS_PERCENTS, payload } }
export const setDiscountSum = (payload) => { return { type: SET_DISCOUNT_SUM, payload } }
export const setDiscountReason = (payload) => { return { type: SET_DISCOUNT_REASON, payload } }
export const setSummaProkata = (payload) => { return { type: SET_SUMMA_PROKATA, payload } }
export const setTariff = (payload) => { return { type: SET_TARIFF, payload } }
export const setTariffName = (payload) => { return { type: SET_TARIFF_NAME, payload } }
export const setFirmId = (payload) => { return { type: SET_FIRM_ID, payload } }
export const setTerritory = (payload) => { return { type: SET_TERRITORY, payload } }
export const setComment = (payload) => { return { type: SET_COMMENT, payload } }
export const setMarks = (payload) => { return { type: SET_MARKS, payload } }
export const setContractForm = (payload) => { return { type: SET_CONTRACT_FORM, payload } }
export const clearContractForm = () => { return { type: CLEAR_FORM } }

