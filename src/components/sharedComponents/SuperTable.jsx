import React from "react";

const SuperTable = ({ rows }) => {
  return (
    <tr>
      <td>{rows.id}</td>
      <td>{rows.partyName}</td>
      <td>{rows.city}</td>
      <td>{rows.startDate}</td>
      <td>{rows.endDate}</td>
    </tr>
  );
};
export default SuperTable;
