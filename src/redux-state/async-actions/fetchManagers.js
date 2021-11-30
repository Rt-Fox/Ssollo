import {FETCH_URL} from "../../configs/urls"
import {setManagers} from "../reducers/listsReducer"
import {setError} from "../reducers/errorReducer";


export const fetchManagers = () => {

    return dispatch => {
        fetch(`${FETCH_URL}/listManagers`, {
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
            .then(response => {
                dispatch(setManagers(response))
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