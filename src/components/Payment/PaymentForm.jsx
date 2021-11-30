import React, {useEffect} from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
    setDelay,
    setDeposit,
    setFuelAfter,
    setFuelBefore, setFuelPrice, setImgAfter, setImgBefore,
    setMileageAfter,
    setMileageBefore,
    setMileagePrice,
    setOrderIdCalc, setSum
} from '../../redux-state/reducers/calculationReducer';
import MoneyOperationDialog from "./Payment-dialogs/MoneyOperationDialog";
import PaymentBtnPanel from "./PaymentBtnPanel";
import {setOrderId} from "../../redux-state/reducers/paymentReducer";
import {fetchPayment} from "../../redux-state/async-actions/payment/fetchPayment";
import {createPayment} from "../../redux-state/async-actions/payment/createPayment";
import moment from "moment";
import {createCalculation} from "../../redux-state/async-actions/calculation/createCalculation";
import {updateCalculation} from "../../redux-state/async-actions/calculation/updateCalculation";
import PaymentUploadImg from "./Payment-upload-img/PaymentUploadImg";
import PaymentTableRows from "./PaymentTableRows";
import PaymentFormFooter from "./PaymentFormFooter";


const FormWrapper = styled.form`
width: 70%;
margin: 20px auto;
`;
const InputRow = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin: 10px 0;
`;

const PaymentForm = () => {
    const user = useSelector(state => state.user)

    const calculation = useSelector(state => state.calculation);
    const activeCar = useSelector(state => state.lists.active_car);
    const contractForm = useSelector(state => state.contractForm);
    const dispatch = useDispatch()

    const hiddenImgBeforeInp = React.useRef()
    const hiddenImgAfterInp = React.useRef()

    useEffect(() => {
        if (activeCar) {
            if (!calculation.deposit) {
                dispatch(setDeposit(activeCar.deposit));
            }
            dispatch(setDelay(contractForm.days_first));
            dispatch(setOrderId(contractForm.id));
            dispatch(setOrderIdCalc(contractForm.id));
            dispatch(fetchPayment(contractForm.id))
        }
    },[])

    useEffect(() => {
        let over = calculation.mileage_after-calculation.mileage_before-activeCar.millage*contractForm.days_first;
        dispatch(setMileagePrice(over>0? over*activeCar.over_millage_price: 0))
    },[calculation.mileage_after,calculation.mileage_before])

    useEffect(() => {
        if (calculation.fuel_after) {
            let over = calculation.fuel_before-calculation.fuel_after;
            dispatch(setFuelPrice(over>0? over*activeCar.fuel_price: 0))
        }
    },[calculation.fuel_after,calculation.fuel_before])

    const formSubmit = (e) => {
        e.preventDefault()
        if (calculation.id) {
            dispatch(updateCalculation(calculation.id,calculation));
        } else {
            dispatch(createCalculation(calculation));
        }
    };

    return  <div>
        <FormWrapper onSubmit={formSubmit}>
            <InputRow>
                <TextField
                           type="number"
                           value={calculation.deposit}
                           onChange={
                               (event) => {
                                   dispatch(setDeposit(event.target.value))
                               }
                           }
                           id="filled-basic" label="Залог" variant="filled" style={{ marginRight: 'auto' }} />
                <PaymentUploadImg
                    refLink={hiddenImgBeforeInp}
                    setFunc={setImgBefore}
                    type={'До'}
                    title={'Приборная панель выдача'}
                    file={calculation.img_before}
                    fileName={calculation.img_before_name}
                    disabled={!user.is_superuser && contractForm.manager_ot_id !== user.id}
                />
                <TextField
                           type="number"
                           value={calculation.fuel_before}
                           onChange={
                               (event) => {
                                   0 <= event.target.value &&  event.target.value <= 100 ?
                                       dispatch(setFuelBefore(event.target.value))
                                   :
                                       dispatch(setFuelBefore(100))
                               }
                           }
                           disabled={!user.is_superuser && contractForm.manager_ot_id !== user.id}
                           id="filled-basic" label="Топливо в начале, %" variant="filled" style={{ marginRight: '20px' }} />
                <TextField
                           type="number"
                           value={calculation.mileage_before}
                           onChange={
                               (event) => {
                                   dispatch(setMileageBefore(event.target.value))
                               }
                           }
                           disabled={!user.is_superuser && contractForm.manager_ot_id !== user.id}
                           id="filled-basic" label="Пробег начало" variant="filled"/>
            </InputRow>
            <InputRow style={{justifyContent: 'flex-end'}}>
                <div style={{ marginRight: 'auto' }}>
                    {user.is_superuser &&
                        <>
                        <Button onClick={() => {
                            dispatch(createPayment({
                                client_id: contractForm.user_id,
                                car_id: contractForm.real_auto_id,
                                operation: 'Залог',
                                payment: calculation.deposit,
                                count: 1,
                                is_deposit: true,
                                is_main_payment: false,
                                service_name: 'Оплата залога',
                                service_price: calculation.deposit,
                                sum_of_money: calculation.deposit,
                                doc_number: contractForm.id,
                                firm_id: contractForm.firm_id,
                                date_of_payment: moment().format('YYYY-MM-DDTHH:mm'),
                                order_id: contractForm.id
                            }, contractForm.id))

                        }} variant="contained" color="primary" style={{marginRight: '20px'}}>
                            Залог
                        </Button>
                            <Button onClick={() => {
                            dispatch(createPayment({
                                client_id: contractForm.user_id,
                                car_id: contractForm.real_auto_id,
                                operation: 'Возврат залога',
                                payment: calculation.deposit,
                                count: 1,
                                is_deposit: false,
                                is_deposit_return: true,
                                is_main_payment: false,
                                service_name: 'Возврат залога',
                                service_price: calculation.deposit,
                                sum_of_money: calculation.deposit,
                                doc_number: contractForm.id,
                                firm_id: contractForm.firm_id,
                                date_of_payment: moment().format('YYYY-MM-DDTHH:mm'),
                                order_id: contractForm.id
                            }, contractForm.id))
                        }}

                            variant="contained" color="primary" style={{marginRight: '20px'}}>
                            Возврат
                            </Button>
                        </>
                    }
                </div>
                <PaymentUploadImg
                    refLink={hiddenImgAfterInp}
                    setFunc={setImgAfter}
                    type={'После'}
                    title={'Приборная панель возврат'}
                    children={calculation.img_after}
                    file={calculation.img_after}
                    fileName={calculation.img_after_name}
                    disabled={!user.is_superuser && contractForm.manager_pr_id !== user.id}
                />
                <TextField
                           type="number"
                           value={calculation.fuel_after}
                           onChange={
                               (event) => {
                                   0 <= event.target.value &&  event.target.value <= 100 ?
                                       dispatch(setFuelAfter(event.target.value))
                                       :
                                       dispatch(setFuelAfter(100))
                               }
                           }
                           disabled={!user.is_superuser && contractForm.manager_pr_id !== user.id}
                           id="filled-basic" label="Топливо в конце,%" variant="filled" style={{ marginRight: '20px' }} />
                <TextField
                           type="number"
                           value={calculation.mileage_after}
                           onChange={
                               (event) => {
                                   dispatch(setMileageAfter(event.target.value))
                               }
                           }
                           disabled={!user.is_superuser && contractForm.manager_pr_id !== user.id}
                           id="filled-basic" label="Пробег конец" variant="filled"/>
            </InputRow>
            <InputRow style={{justifyContent: 'flex-end'}}>
                <TextField value={calculation.fuel_after?calculation.fuel_before-calculation.fuel_after:0} id="filled-basic" label="Топливо разница" variant="filled" style={{ marginLeft: '240px',marginRight: '20px' }} />
                <TextField value={calculation.mileage_after-calculation.mileage_before} id="filled-basic" label="Километраж" variant="filled" />
            </InputRow>
            <InputRow style={{justifyContent: 'flex-end'}}>
                <TextField id="filled-basic" value={calculation.fuel_price?calculation.fuel_price:0} label="За топливо" variant="filled" style={{ marginRight: '20px' }} />
                <TextField id="filled-basic" value={(calculation.mileage_after-calculation.mileage_before-activeCar.millage*contractForm.days_first)>=0?calculation.mileage_after-calculation.mileage_before-activeCar.millage*contractForm.days_first:0} label="Перепробег" variant="filled" />
            </InputRow>
            <InputRow>
                <TextField id="filled-basic" value={calculation.sum_for_mileage_over?calculation.sum_for_mileage_over:0} label="За перепробег" variant="filled" style={{ marginLeft: 'auto' }} />
            </InputRow>
            {user.is_superuser&&
            <InputRow>
                <PaymentBtnPanel />
                <div style={{marginLeft: 'auto'}}></div>
                <Button onClick={()=>{
                    dispatch(createPayment({
                        client_id: contractForm.user_id,
                        car_id: contractForm.real_auto_id,
                        operation: 'Оплата за топливо',
                        payment: calculation.fuel_price,
                        count: 1,
                        is_for_fuel: true,
                        service_name: 'Оплата за топливо',
                        service_price: calculation.fuel_price,
                        sum_of_money: calculation.fuel_price,
                        firm_id: contractForm.firm_id,
                        date_of_payment: moment().format('YYYY-MM-DDTHH:mm'),
                        order_id: contractForm.id,
                        doc_number: contractForm.id
                    },contractForm.id))
                }} variant="contained" color="primary" style={{ marginRight: '20px' }}
                    disabled={calculation.fuel_before-calculation.fuel_after <= 0}
                >
                    Оплата за топливо
                </Button>
                <Button onClick={()=>{
                    dispatch(createPayment({
                        client_id: contractForm.user_id,
                        car_id: contractForm.real_auto_id,
                        operation: 'Оплата за перепробег',
                        payment: calculation.sum_for_mileage_over,
                        count: 1,
                        is_for_mileage_over: true,
                        service_name: 'Оплата за перепробег',
                        service_price: calculation.sum_for_mileage_over,
                        sum_of_money: calculation.sum_for_mileage_over,
                        firm_id: contractForm.firm_id,
                        date_of_payment: moment().format('YYYY-MM-DDTHH:mm'),
                        order_id: contractForm.id,
                        doc_number: contractForm.id
                    },contractForm.id))
                }} variant="contained" color="primary"
                    disabled={(calculation.mileage_after-calculation.mileage_before-activeCar.millage*contractForm.days_first) <= 0}
                >
                    Оплата за перепробег
                </Button>
            </InputRow>
            }

            <PaymentTableRows />
            <InputRow>
                <PaymentFormFooter  calculation={calculation} />
            </InputRow>
            <Button type='submit' style={{marginLeft: 'auto'}} variant="contained" color="primary">
                Сохранить
            </Button>
        </FormWrapper>
        <MoneyOperationDialog />
    </div>

}


export default PaymentForm;