import React from 'react';
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {FETCH_URL} from "../../configs/urls";

const LinkContainer = styled.a`
  margin-left: auto!important;
  margin-right: 20px!important;
  text-decoration: none;
`;


const ContractPrint = ({id}) => {
    return (
        <LinkContainer href={FETCH_URL+"/dogovor/"+id}>
            <Button
                variant="contained" color="primary">
                Печать контракта
            </Button>
        </LinkContainer>
    );
};

export default React.memo(ContractPrint);