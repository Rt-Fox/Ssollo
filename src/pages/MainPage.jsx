import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import TopNav from '../containers/TopNav';
import TableContainer from '../containers/TableContainer';
import Error from "./Error";
import Success from "./Success";
import {getUser} from "../redux-state/async-actions/getUser";
import {useDispatch} from "react-redux";

const Wrapper = styled.div`

`;

const MainPage = () => {
    const dispatch = useDispatch()

    const firstRenderRef = useRef(true);
    useEffect(()=>{
        if (firstRenderRef.current) {
            dispatch(getUser())
        }
        firstRenderRef.current = false
    })
    return <Wrapper>
                <TopNav/>
                <TableContainer/>
                <Error />
                <Success />
            </Wrapper>
}

export default MainPage