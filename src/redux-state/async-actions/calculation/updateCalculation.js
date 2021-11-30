import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchTableRows} from "../fetchTableRows";
import {setSuccess} from "../../reducers/successReducer";
import {csrftoken} from "../../../configs/Cooki";


export const updateCalculation = (id,data) => {
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

    if (data.img_before !== null) {
        delete data['img_before'];
        delete data['img_before_name'];
    }
    if (data.img_after !== null) {
        delete data['img_after'];
        delete data['img_after_name'];
    }
    return dispatch => {
        fetch(`${FETCH_URL}/calculation/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            method: 'PATCH',
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
            .then( ()=> {
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