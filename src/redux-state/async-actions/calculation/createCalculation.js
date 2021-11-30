import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchTableRows} from "../fetchTableRows";
import {setSuccess} from "../../reducers/successReducer";
import {csrftoken} from "../../../configs/Cooki";


export const createCalculation = (data) => {
    if (data.fuel_after === null) {
        delete data['fuel_after'];
    }
    if (data.fuel_before === null) {
        delete data['fuel_before'];
    }
    if (data.mileage_before === null) {
        delete data['mileage_before'];
    }
    if (data.mileage_after === null) {
        delete data['mileage_after'];
    }
    return dispatch => {
        fetch(`${FETCH_URL}/calculation/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then(()=> {
                dispatch(fetchTableRows(true))
                dispatch(fetchTableRows(false))
                dispatch(setSuccess({open: true}))

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