import React, {useEffect,useCallback} from 'react';
import styled from "styled-components";


const ModalOverlayDiv = styled.div`
    position: absolute;
    cursor: pointer;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1400;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalOverlay = ({handleClickClose}) => {

    const listen = useCallback((event) => {
        if (event.defaultPrevented) {
            return;
        }
        if (event.key === 'Esc' || event.key === 'Escape') {
            handleClickClose()
        }
    },[handleClickClose])

    useEffect(()=>{
        // Устанавливаем слушатель события при монтировании
        document.addEventListener("keydown", (event)=> listen(event));
        // Сбрасываем слушатель события при удалении компонента из DOM
        return () => {
            document.removeEventListener("keydown", (event)=> listen(event));
        }
    }, [listen])
    return (
        <ModalOverlayDiv onClick={
            (event) =>
                    handleClickClose()
            } />
    );
};

export default ModalOverlay;