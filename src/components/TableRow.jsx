import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import {clearCalculateForm, setCalcForm} from "../redux-state/reducers/calculationReducer";
import {
  setCurrentLeft,
  setCurrentRight,
} from "../redux-state/reducers/currentRowReducer";
import { toggleContractDialog } from "../redux-state/reducers/DialogsReducer";
import moment from "moment";
import {setContractForm} from "../redux-state/reducers/contractFormReducer";
import {setActiveCar} from "../redux-state/reducers/listsReducer";

const Row = styled.div`
white-space: nowrap;
width: 2930px;
transition: .2s;
    :hover{
        background: #eee;
        cursor: pointer;
    }
`;
const Cell = styled.div`
  white-space: nowrap;
  display: inline-block;
  padding: 2px 6px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  overflow: hidden;
  min-width: 230px;
  height: 100%;
  text-align: center;
`;

const TableRow = (props) => {
    const dispatch = useDispatch()
    const rowRef = React.useRef()
    return <>
        <Row
            style={{
                background: props.isCurrent ? 'lightblue' : ''
            }}
            ref={rowRef}
            onClick={
                () => {
                    if (props.side === 'right') {
                        dispatch(setCurrentRight(props.id))
                    } else if (props.side === 'left') {
                        dispatch(setCurrentLeft(props.id))
                    }

                }
            }
            onDoubleClick={
                () => {
                    dispatch(clearCalculateForm())
                    dispatch(setActiveCar(props.automobile));
                    dispatch(setContractForm(props))
                    if (props.list) {
                        dispatch(setCalcForm({
                            id: props.list.id? props.list?.id : null,
                            sum_for_mileage_over: props.list?.sum_for_mileage_over?props.list?.sum_for_mileage_over:0,
                            order_id: props.id,
                            deposit: props.list.deposit?props.list.deposit:props,
                            delay: props.list?.delay,
                            fuel_before: props.list?.fuel_before?props.list?.fuel_before:null,
                            fuel_after: props.list?.fuel_after !== ''? props.list?.fuel_after :null,
                            img_after: props.list?.img_after,
                            img_after_name: props.list?.img_after_name,
                            img_before: props.list?.img_before,
                            img_before_name: props.list?.img_before_name,
                            mileage_before: props.list?.mileage_before?props.list?.mileage_before:null,
                            mileage_after: props.list?.mileage_after?props.list?.mileage_after:null,
                            list: props.payments
                        }))
                    }
                    dispatch(toggleContractDialog(true))
                }
            }
        >
            <Cell>
                {props.side==='left'?moment(props.start_datetime).format('HH:mm DD-MM-YYYY '):moment(props.end_datetime).format('HH:mm DD-MM-YYYY ')}
            </Cell>
            <Cell>
                {props.gos_number}
            </Cell>
            <Cell>
                {props.auto_name}
            </Cell>
            <Cell>
                {props.side==='left'?props.address_gave:props.address_received}
            </Cell>
            <Cell>
                {props.client_name}
            </Cell>
            <Cell>
                {props.summa_prokata}
            </Cell>
            <Cell>
                {props.balance}
            </Cell>
            <Cell>
                {props.days_first}
            </Cell>
            <Cell>
                {props.side==='right'?moment(props.start_datetime).format('HH:mm DD-MM-YYYY '):moment(props.end_datetime).format('HH:mm DD-MM-YYYY ')}
            </Cell>
            <Cell>
                {props.contract_number}
            </Cell>
            <Cell>
                {props.comment}
            </Cell>
            <Cell>
                {props.marks}
            </Cell>
        </Row>
    </>
};

export default React.memo(TableRow);
