import React, {useEffect} from 'react';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMoneyOpDialog } from '../../../redux-state/reducers/DialogsReducer';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    setAccruedPayment, setCarIdPayment, setClientId, setCountPayment,
    setDateOfPayment, setDocNumber, setFirmIdPayment, setOrderId, setSumOfMoney, setUserInfo
} from '../../../redux-state/reducers/paymentReducer';
import AutoDialog from "../../Dialog/AutoDialog";
import {
    setContractNumber,
} from "../../../redux-state/reducers/contractFormReducer";
import ClientDialog from "../../Dialog/ClientDialog";
import FirmDialog from "../../Dialog/firmDialog";
import ServicesDialog from "./ServicesDialog";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import moment from "moment";
import {createPayment} from "../../../redux-state/async-actions/payment/createPayment";
import {updatePayment} from "../../../redux-state/async-actions/payment/updatePayment";

const InputRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 570px;
box-sizing: border-box;
padding-right: 30px;
margin: 10px 0;
`;
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function MoneyOperationDialog() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const open = useSelector(state => state.dialogs.moneyOp)
    const type = useSelector(state => state.dialogs.moneyOpType)
    const contractForm = useSelector(state => state.contractForm)
    const paymentForm = useSelector(state => state.paymentForm)
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (paymentForm.date_of_payment === '') {
            dispatch(setDateOfPayment(moment().format('YYYY-MM-DDTHH:mm')))
        }
    },[open]);
    useEffect((render) => {
        let summa = paymentForm.service_price*paymentForm.count
        dispatch(setAccruedPayment(Math.ceil(summa)))
    }, [paymentForm.service_price,paymentForm.count]);

    useEffect(() => {
        if (paymentForm.user_id === null) {
            dispatch(setUserInfo({id: user.id, full_name: user.full_name }))
        }
        if(contractForm.id){dispatch(setOrderId(contractForm.id))}
        if(contractForm.real_auto_id){dispatch(setCarIdPayment(contractForm.real_auto_id))}
        if(contractForm.user_id){dispatch(setClientId(contractForm.user_id))}
        if(contractForm.firm_id){dispatch(setFirmIdPayment(contractForm.firm_id))}
        if(contractForm.id){dispatch(setDocNumber(contractForm.id))}
    },[contractForm, open]);

    const handleClose = () => {
        dispatch(toggleMoneyOpDialog({flag:false, type:0}))
    };

    const formSubmit = (e) => {
        e.preventDefault()

        if (paymentForm.id) {
            dispatch(updatePayment(paymentForm.id,paymentForm,contractForm.id))
        } else {
            dispatch(createPayment(paymentForm,contractForm.id))
        }
        dispatch(toggleMoneyOpDialog({flag: false, type: null} ))
    }

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{type===1?'Оплата по договору':type===2?'Операция с деньгами':null}</DialogTitle>
                <form onSubmit={formSubmit}>
                    <DialogContent>
                        <InputRow>
                            <TextField required
                                id="datetime-local"
                                label="Дата, время"
                                type="datetime-local"
                                value={moment(paymentForm.date_of_payment).format('YYYY-MM-DDTHH:mm')}
                                onChange={
                                    (event) => {
                                        dispatch(setDateOfPayment(event.target.value))
                                    }
                                }
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                value={paymentForm.user_full_name}
                                id="standard-basic"
                                label="Создал" />
                        </InputRow>
                        {type===1?
                            <React.Fragment>
                                <InputRow>
                                    <TextField value={contractForm.id} onChange={(event) => dispatch(setContractNumber(event.target.value))} id="filled-basic" label="Договор №" style={{ marginRight: '20px', width: '30%' }} />
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '75%'
                                    }}>
                                        <TextField readOnly value={contractForm.client_name} id="filled-basic" label="Клиент" style={{ width: '95%' }} />
                                        <ClientDialog />
                                    </div>
                                </InputRow>
                                <InputRow>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '30%'
                                    }}>
                                        <TextField value={contractForm.gos_number} readOnly id="filled-basic" label="Автомобиль"  style={{ width: '90%' }} />
                                        <AutoDialog />
                                    </div>
                                    <TextField id="filled-basFic" value={contractForm.auto_name} style={{ width: '70%', marginTop: 'auto' }} />
                                </InputRow>
                            </React.Fragment>
                            :null
                        }
                        <InputRow>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%'
                                }}
                            >
                                <TextField
                                    id="standard-basic"
                                    label="Услуга"
                                    style={{width: '100%'}}
                                    value={paymentForm.service_name}
                                />
                                {type===1?null:
                                <ServicesDialog />}
                            </div>
                        </InputRow>

                        <InputRow>
                            <TextField required
                                id="standard-basic"
                                label="Тариф"
                                value={paymentForm.service_price}
                                />
                            {type===1?
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '50%'
                                }}>
                                    <TextField value={contractForm.firm_name} id="filled-basic" label="Фирма" style={{ width: '87%' }} />
                                    <FirmDialog/>
                                </div>
                                :
                                null
                            }

                        </InputRow>
                        <InputRow style={{display: 'flex', justifyContent: 'start'}}>
                            <IconButton color="primary"
                                        onClick={
                                            () => {
                                                dispatch(setCountPayment(+paymentForm.count - 1 >= 1 ? +paymentForm.count - 1 : 1))
                                            }
                                        }
                            >
                                <ArrowLeftIcon />
                            </IconButton>
                            <TextField id="filled-basic" style={{width: '20%'}} label={type===1?'Дней':'Количество'} value={'' + paymentForm.count} onChange={(event) =>event.target.value>0?dispatch(setCountPayment(event.target.value)):dispatch(setCountPayment(1))} type="number" />
                            <IconButton color="primary"
                                        onClick={
                                            () => {
                                                dispatch(setCountPayment(+paymentForm.count + 1))
                                            }
                                        }
                            >
                                <ArrowRightIcon />
                            </IconButton>
                        </InputRow>
                        <InputRow>
                            <TextField required
                                id="standard-basic"
                                label="Сумма"
                                value={+paymentForm.sum_of_money}
                            />
                            <IconButton color="primary"
                                        onClick={
                                            () => {
                                                dispatch(setSumOfMoney(paymentForm.payment))
                                            }
                                        }
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <TextField
                                id="standard-basic"
                                label="Начислено"
                                type='number'
                                value={''+paymentForm.payment}
                                onChange={(event) =>dispatch(setAccruedPayment(event.target.value))}
                            />
                        </InputRow>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Отменить
                        </Button>
                        <Button type='submit' color="primary">
                            Записать
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}