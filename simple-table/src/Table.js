import React from 'react';
import './TableStyles.css';

function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Title</th>
          <th>Field</th>
          <th>Old Value</th>
          <th>New Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.title}</td>
            <td>{item.field}</td>
            <td>{item.old_value}</td>
            <td>{item.new_value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
