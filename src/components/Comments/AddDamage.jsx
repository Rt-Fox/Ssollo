import React from 'react';

import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Tooltip from "@material-ui/core/Tooltip";
import {setCommentComment} from "../../redux-state/reducers/commentReducer";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {toggleCommentsDialog} from "../../redux-state/reducers/DialogsReducer";


const ElemPos = styled.div`
position: absolute;
top: ${(props) => (props.pos_y+'%')};
left: ${(props) => (props.pos_x+'%')};
transform: translate(-50%,-50%);
`;

const AddDamage = (props) => {
    const {title, pos_x, pos_y} = props;
    const dispatch = useDispatch();

    return (
        <ElemPos pos_x={pos_x} pos_y={pos_y}>
            <Tooltip title={title}>
                <AddCircleOutlinedIcon
                    onClick={()=> {
                        dispatch(setCommentComment(title));
                        dispatch(toggleCommentsDialog(false))
                    }}
                    color={'primary'} style={{ fontSize: '40px' , backgroundColor: 'fff', borderRadius: '50%'}}/>
            </Tooltip>
        </ElemPos>

    );
};

export default React.memo(AddDamage);