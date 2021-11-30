import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableRows } from '../redux-state/async-actions/fetchTableRows';
import LeftTable from '../components/LeftTable';
import RightTable from '../components/RightTable';
import ContractDialog from '../components/ContractDialog';

const Wrapper = styled.div`
display: flex;
width: 100vw;
`;

const TableContainer = () => {
    const dispatch = useDispatch()
    const tables = useSelector(state => state.tableRows)

    React.useEffect(() => {
        dispatch(fetchTableRows(true))
        dispatch(fetchTableRows(false))
    }, [dispatch])
    return <Wrapper>
        <ContractDialog />
        <LeftTable
            rows={tables.left}
        />
        <RightTable
            rows={tables.right}
        />
    </Wrapper>
}

export default TableContainer;
