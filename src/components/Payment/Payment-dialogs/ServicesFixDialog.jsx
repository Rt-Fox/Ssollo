import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {toggleServicesFixDialog} from "../../../redux-state/reducers/DialogsReducer";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {setServiceName, setServicePrice} from "../../../redux-state/reducers/serviceFormReduser";
import {createServices} from "../../../redux-state/async-actions/services/createServices";
import {updateServices} from "../../../redux-state/async-actions/services/updateServices";

const InputRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 570px;
box-sizing: border-box;
padding-right: 30px;
margin: 10px 0;
`;

export default function ServicesFixDialog() {
    const dispatch = useDispatch();
    const open = useSelector(state => state.dialogs.services_fix)
    const type = useSelector(state => state.dialogs.services_fix_type)
    const serviceForm = useSelector(state => state.serviceForm)
    const handleClose = () => {
        dispatch(toggleServicesFixDialog(false))
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{type==='create'?'Создание новой услуги':'Изменение услуги'}</DialogTitle>
            <DialogContent>
                <InputRow>
                    <TextField value={serviceForm.name} onChange={(event) => dispatch(setServiceName(event.target.value)) } id="filled-basic" label="Название услуги" variant="filled" style={{ marginRight: '20px', width: '120%' }} />
                </InputRow>
                <InputRow>
                    <TextField value={serviceForm.price} type="number" onChange={(event) => event.target.value>=0?dispatch(setServicePrice(event.target.value)):dispatch(setServicePrice(serviceForm.price))} id="filled-basic" label="Стоимость" variant="filled" style={{ marginRight: '20px', width: '120%' }} />
                </InputRow>
                <InputRow>
                    <Button onClick={() => {
                            if (type==='create') {
                                dispatch(createServices(serviceForm))
                            } else {
                                dispatch(updateServices(serviceForm.id,{name: serviceForm.name, price: serviceForm.price}))
                            }
                            dispatch(toggleServicesFixDialog(false))}
                    } style={{marginRight: '50px', marginTop: '20px'}} variant="contained" >
                            {type==='create'?'Добавить услугу':'Изменить услугу'}
                        </Button>
                </InputRow>
            </DialogContent>
        </Dialog>
    );
};

