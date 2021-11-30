import {setLeftTableRows, setRightTableRows} from "../reducers/tableRowsReducer";
import {FETCH_URL} from "../../configs/urls";
import {store} from "..";
import moment from "moment";
import {setError} from "../reducers/errorReducer";

export const fetchTableRows = (leftOrRight) => {
    return dispatch => {
        fetch(`${FETCH_URL}/contract/${leftOrRight ? 'left' : 'right'}?date=${moment(store.getState().date.date).format('YYYY-MM-DD')}`, {
            type: 'GET',
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then(res => {
                if (leftOrRight) {
                    dispatch(setLeftTableRows(res))
                } else {
                    dispatch(setRightTableRows(res))
                }
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
