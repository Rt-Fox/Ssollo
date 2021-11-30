import React from 'react';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {toggleMoneyOpDialog} from "../../redux-state/reducers/DialogsReducer";
import {
    clearPaymentForm,
    setAccruedPayment,
    setCountPayment,
    setService,
    setTypePayment
} from "../../redux-state/reducers/paymentReducer";
import {deletePayment} from "../../redux-state/async-actions/payment/deletePayment";

const PaymentBtnPanel = () => {
    const dispatch = useDispatch()
    const contractForm = useSelector(state => state.contractForm)
    const currentRowPayment = useSelector(state => state.currentRow.payment)

    const handleClickPayment = () => {
        dispatch(clearPaymentForm());
        dispatch(setTypePayment({is_deposit: false, is_main_payment: true}))
        dispatch(setService({id: null,name: 'За прокат по договору № '+contractForm.id,price: contractForm.tariff}));
        dispatch(setCountPayment(contractForm.days_first));
        dispatch(setAccruedPayment(contractForm.summa_prokata))
        handleClickOpen(true, 1);
    };
    const handleClickDopPayment = () => {
        dispatch(clearPaymentForm());
        dispatch(setService({id: null,name: 'Дополнительный платеж', price: ''}));
        dispatch(setCountPayment(1));
        handleClickOpen(true, 2)
    };
    const handleClickOpen = (flag, type) => {
        dispatch(toggleMoneyOpDialog({flag: flag, type: type}))
    };
    return (
        <React.Fragment>
            <Button onClick={handleClickPayment} variant="contained" color="primary" style={{ marginRight: '20px' }}>
                Оплата
            </Button>
            <Button onClick={handleClickDopPayment} variant="contained" color="primary" style={{ marginRight: '20px' }}>
                Добавить
            </Button>
        </React.Fragment>
    );
};

export default PaymentBtnPanel;