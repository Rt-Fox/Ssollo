import {FETCH_URL} from "../../../configs/urls"
import {setCurrentActivePayment} from "../../reducers/currentRowReducer";
import {setError} from "../../reducers/errorReducer";
import {setAllPayment} from "../../reducers/paymentReducer";


export const getOnePayment = (id) => {

    return dispatch => {
        fetch(`${FETCH_URL}/payment/${id}`, {
            method: 'GET',
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then((json) => {
                dispatch(setCurrentActivePayment(json))
                dispatch(setAllPayment(
                    {
                        id: json?.id,
                        employee_id: json?.employee?.id,
                        employee_name: json?.employee?.full_name,
                        // client_id: json?.client?.id,
                        // car_id: json?.real_auto?.id,
                        // operation: '0',
                        payment: json?.payment,
                        count: json?.count,
                        is_deposit: json?.is_deposit,
                        is_deposit_return: json?.is_deposit_return,
                        is_main_payment: json?.is_main_payment,
                        service_id: json?.service?.id,
                        service_name: json?.service_name,
                        service_price: json?.service_price,
                        sum_of_money: json?.sum_of_money,
                        // doc_number: json?.doc_number,
                        // firm_id: json?.firm?.id,
                        date_of_payment: json?.date_of_payment,
                        // order_id: json?.order?.id
                    }))
            })
            .catch((error) => {
                if(typeof error.then === "function") {
                    error
                        .then((error) =>
                            dispatch(setError({open: true, error: error}))
                        )
                }
            })
    }
}