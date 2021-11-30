import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import { toggleTerritoryPlaceFixDialog} from "../../redux-state/reducers/DialogsReducer";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {setPlaceNameForm} from "../../redux-state/reducers/placeFormReduser";
import {createPlace} from "../../redux-state/async-actions/place/createPlace";
import {updatePlace} from "../../redux-state/async-actions/place/updatePlace";
import {createTerritory} from "../../redux-state/async-actions/territory/createTerritory";
import {updateTerritory} from "../../redux-state/async-actions/territory/updateTerritory";
import {createFirm} from "../../redux-state/async-actions/firm/createFirm";
import {updateFirm} from "../../redux-state/async-actions/firm/updateFirm";

const InputRow = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 570px;
box-sizing: border-box;
padding-right: 30px;
margin: 10px 0;
`;

function PlaceFixDialog() {
    const dispatch = useDispatch();
    const open = useSelector(state => state.dialogs.place_fix)
    const type = useSelector(state => state.dialogs.place_fix_type)
    const kindPlace = useSelector(state => state.dialogs.kind_place)
    const placeForm = useSelector(state => state.placeForm)

    const handleClose = () => {
        dispatch(toggleTerritoryPlaceFixDialog({flag: false}))
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{type === 'create' ? 'Создание новой записи'  : 'Изменение записи'} </DialogTitle>
            <DialogContent>
                <InputRow>
                    <TextField value={placeForm.name}
                               onChange={(event) => {dispatch(setPlaceNameForm(event.target.value))}} id="filled-basic"
                               label={kindPlace} variant="filled" style={{marginRight: '20px', width: '120%'}}/>
                </InputRow>
                <InputRow>
                    <Button onClick={() => {
                        if (kindPlace==='Aдрес') {
                            if (type === 'create') {
                                dispatch(createPlace({address: placeForm.name}))
                            } else {
                                dispatch(updatePlace(placeForm.id, {address: placeForm.name}))
                            }

                        }
                        if (kindPlace==='Территория') {
                            if (type === 'create') {
                                dispatch(createTerritory({territory_name: placeForm.name}))
                            } else {
                                dispatch(updateTerritory(placeForm.id, {territory_name: placeForm.name}))
                            }
                        }
                        if (kindPlace==='Фирма') {
                            if (type === 'create') {
                                dispatch(createFirm({name: placeForm.name}))
                            } else {
                                dispatch(updateFirm(placeForm.id, {name: placeForm.name}))
                            }
                        }
                        dispatch(toggleTerritoryPlaceFixDialog({flag: false}))
                    }} style={{marginRight: '50px', marginTop: '20px'}} variant="contained">
                        {type === 'create' ? 'Добавить поле' : 'Изменить поле' }
                    </Button>
                </InputRow>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(PlaceFixDialog)