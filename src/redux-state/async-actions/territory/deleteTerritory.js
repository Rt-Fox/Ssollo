import {FETCH_URL} from "../../../configs/urls"
import {setError} from "../../reducers/errorReducer";
import {fetchTerritories} from "./fetchTerritories";
import {csrftoken} from "../../../configs/Cooki";


export const deleteTerritory = (id) => {

    return dispatch => {
        fetch(`${FETCH_URL}/territory/${id}`, {
            headers: {
                'X-CSRFToken': csrftoken
            },
            method: 'DELETE',
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw response.json();
                }
            })
            .then(()=> {
                dispatch(fetchTerritories())
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