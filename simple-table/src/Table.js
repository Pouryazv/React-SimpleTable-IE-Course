import React from 'react';
import './TableStyles.css';
import './Sortbutton.css';

function Table({ data,onCheckChange,sortData }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Title</th>
          <th>Field <button className="sort-button" onClick={sortData}>Sort</button> </th>
          <th>Old Value</th>
          <th>New Value</th>
          <th>Check Out</th>
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
            <td>              <input 
                type="checkbox" 
                checked={item.isChecked} 
                onChange={(e) => onCheckChange(item.id, e.target.checked)} 
              /></td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}

export default Table;
