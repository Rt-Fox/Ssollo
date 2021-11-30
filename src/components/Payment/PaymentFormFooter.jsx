import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import {setSum} from "../../redux-state/reducers/calculationReducer";
import {useDispatch, useSelector} from "react-redux";

const PaymentFormFooter = ({calculation}) => {
    const dispatch = useDispatch();
    const rows = useSelector(state => state.calculation.list);
    let sum_one = 0;
    let sum_two = 0;
    useEffect(()=>{
        rows.forEach(row => {
            if (!(row.is_deposit||row.is_deposit_return)) {
                sum_one += row.payment
                sum_two += row.sum_of_money
            }
        })
        dispatch(setSum({sum_one: sum_one, sum_two: sum_two, balance: sum_one - sum_two}))
    },[rows])

    return (
        <>
            <TextField
                type="number" id="filled-basic" value={''+calculation.delay} label="Дней" variant="filled" style={{ marginRight: '30px' }} />
            <TextField value={+calculation.sum_one}
                       type="number" id="filled-basic" label="Начислено" variant="filled" style={{ marginRight: '30px' }} />
            <TextField value={+calculation.sum_two}
                       type="number" id="filled-basic" label="Оплачено" variant="filled" style={{ marginRight: '30px' }} />
            <TextField value={+calculation.balance}
                       type="number" id="filled-basic" label="Баланс" variant="filled" style={{ marginRight: '30px' }} />
        </>
    );
};

export default React.memo(PaymentFormFooter);