import React from 'react';

interface TableObject {
  id: string;
  partyName: string;
  city: string;
  startDate: string;
  endDate: string;
}

interface StateProps {
  rows: TableObject;
}

type Props = StateProps;

const SuperTable = (props: Props): JSX.Element => (
  <tr>
    <td>{props.rows.id}</td>
    <td>{props.rows.partyName}</td>
    <td>{props.rows.city}</td>
    <td>{props.rows.startDate}</td>
    <td>{props.rows.endDate}</td>
  </tr>
);
export default SuperTable;
