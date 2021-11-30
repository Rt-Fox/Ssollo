import {FETCH_URL} from "../../../configs/urls"
import {setServices} from "../../reducers/listsReducer"
import {setError} from "../../reducers/errorReducer";


export const fetchServices = () => {

    return dispatch => {
        fetch(`${FETCH_URL}/services/`, {
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
                dispatch(setServices(json))
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