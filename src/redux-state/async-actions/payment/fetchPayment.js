import {FETCH_URL} from "../../../configs/urls"
import {setCalcList} from "../../reducers/calculationReducer";
import {setError} from "../../reducers/errorReducer";


export const fetchPayment = (id) => {

    return dispatch => {
        fetch(`${FETCH_URL}/payment?order_id=${id}`, {
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
            .then(json => {
                dispatch(setCalcList(json))
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