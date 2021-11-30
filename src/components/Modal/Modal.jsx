import React from 'react';

import ModalOverlay from "./ModalOverlay";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

const modalRoot = document.getElementById("react-modals")

const ModaleImg = styled.section`
    position: absolute;
    z-index: 1401;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #1C1C21;

    border: 1px solid #3f51b542;
    box-sizing: border-box;
    width: 720px;
    height: auto;
    box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
    border-radius: 40px;
`;
const Header = styled.header`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    height: 64px;
    align-items: center;
    padding: 20px 20px 0;
`;
const Title = styled.h1`
    color: white;
`;
const Main = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    flex-direction: column;
`;
const Img = styled.img`
  max-height: 500px;
  min-height: 300px;
  max-width: 700px;
`;
const Modal = (props) => {
    const { children, header, handleClickClose } = props;

    return ReactDOM.createPortal(
        <>
            <ModalOverlay handleClickClose={handleClickClose} />
            <ModaleImg>
                <Header>
                    <CloseIcon onClick={()=>handleClickClose()} style={{color: 'white', fontSize: '40px', cursor: "pointer"}} />
                    <Title>{header}</Title>
                </Header>
                <Main>
                    <Img src={children?children:''} alt=""/>
                </Main>
            </ModaleImg>
        </>,
        modalRoot
    );
};

export default Modal;