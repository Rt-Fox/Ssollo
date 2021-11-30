import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import styled from "styled-components";
import {useDispatch} from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "../../Modal/Modal";

const HiddenFileInput = styled.input`
display: none;
`;

const PaymentUploadImg = (props) => {
    const { refLink, setFunc, type, title, file, fileName, disabled } = props;

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const fileHandler = event => {
        let reader = new FileReader();
        reader.onload = function (e) {
            dispatch(setFunc({file: e.target.result, name: event.target.files[0].name}))
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleClickOpen = () => {
        setOpen(true)
    };
    const handleClickClose = () => {
        setOpen(false)
    };

    return (
        <div style={{marginRight: '20px'}}>
            <HiddenFileInput
                type="file"
                onChange={fileHandler}
                ref={refLink}
            />
            <Tooltip title={title}>
                <span>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon/>}
                        disabled={disabled}
                        onClick={() => {
                            refLink.current.click()
                        }}
                    >
                        {fileName ? fileName : type}
                    </Button>
                </span>
            </Tooltip>
            {file&&<OpenInNewIcon style={{cursor: "pointer"}} onClick={handleClickOpen}/>}
            {open && <Modal children={file} handleClickClose={handleClickClose}  header={title}/>}
        </div>
    );
};

export default PaymentUploadImg;