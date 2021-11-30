import React from 'react'
import styled from 'styled-components'
import TableRow from './TableRow';
import { useSelector } from 'react-redux';

const Row = styled.div`
white-space: nowrap;
flex-direction: row;
`;
const Cell = styled.div`
background-color: #dfdfdf;
white-space: nowrap;
display: inline-block;
padding: 2px 6px;
border-left: 1px solid #000;
border-right: 1px solid #000;
overflow: hidden;
min-width: 230px;
text-align: center;
`;
const Wrapper = styled.div`
    overflow: scroll;
    display: flex;
    flex-direction: column;
    height: 400px;
`;

const LeftTable = (props) => {

    const current = useSelector(state => state.currentRow.left)

    return <Wrapper style={{maxWidth: props.width ? props.width + '%' : '50%'}}>
        <Row>
            <Cell>
                Время
            </Cell>
            <Cell>
                Автомобиль
            </Cell>
            <Cell>
                Модель автомобиля
            </Cell>
            <Cell>
                Место выдачи
            </Cell>
            <Cell>
                Клиент
            </Cell>
            <Cell>
                Оплата
            </Cell>
            <Cell>
                Баланс
            </Cell>
            <Cell>
                Дней
            </Cell>
            <Cell>
                Дата возврата
            </Cell>
            <Cell>
                Дог. №
            </Cell>
            <Cell>
                Примечание
            </Cell>
            <Cell>
                Отметки
            </Cell>
        </Row>
        {props.rows.map((item) =>
            <TableRow
                key={item.id}
                id={item.id}
                isCurrent={current === item.id}
                side='left'
                balance={item.user?.balance}

                list={item.calculation[0]}
                payments={item.payments}
                automobile={item.automobile}

                contract_number={item.contract_number}

                manager_ot_id={item.manager_ot?.id}
                manager_ot_name={item.manager_ot?.full_name}
                manager_pr_id={item.manager_pr?.id}
                manager_pr_name={item.manager_pr?.full_name}
                address_gave={item.address_gave?.address}
                address_gave_id={item.address_gave?.id}
                address_received={item.address_received?.address}
                address_received_id={item.address_received?.id}
                automobile_id={item.automobile.id}
                tariff_name={item.automobile?.name}
                real_auto_id={item.real_auto?.id}
                gos_number={item.real_auto?.gos_number}
                auto_name={item.real_auto?.name + ', ' + item.real_auto?.gos_number}
                user_id={item.user?.id}
                client_name={item.user?.full_name}
                client_phone={item.user?.phone}
                comment={item.comment}
                marks={item.marks}
                territory_id={item.territory?.id}
                territory_address={item.territory?.territory_name}
                representative_first_id={item.representative_first?.id}
                representative_first_name={item.representative_first?.full_name}
                representative_second_id={item.representative_second?.id}
                representative_second_name={item.representative_second?.full_name}
                start_datetime={item.start_datetime}
                end_datetime={item.end_datetime}
                is_given={item.is_given}
                is_returned={item.is_returned}
                days_first={item.days_first}
                days_second={item.days_second}
                discount_percents={item.discount_percents}
                discount_sum={item.discount_sum}
                discount_reason={item.discount_reason}
                summa_prokata={item.summa_prokata}
                tariff={item.tariff}
                tariff_date={item.tariff_date}
                pay_date={item.tariff_date}
                firm_id={item.firm?.id}
                firm_name={item.firm?.name}
            />
        )}

    </Wrapper>
}

export default LeftTable;