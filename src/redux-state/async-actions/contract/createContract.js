import {FETCH_URL} from "../../../configs/urls"
import {setIdContract} from "../../reducers/contractFormReducer";
import {setError} from "../../reducers/errorReducer";
import {fetchTableRows} from "../fetchTableRows";
import {setSuccess} from "../../reducers/successReducer";
import {csrftoken} from "../../../configs/Cooki";


export const createContract = (data) => {

    return dispatch => {
        fetch(`${FETCH_URL}/contract/`, {
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
            .then((json) => {
                dispatch(setIdContract(json.id))
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
