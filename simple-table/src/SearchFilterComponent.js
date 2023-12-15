import React, { useState } from 'react';
import Table from './Table';

const SearchFilterComponent = ({ data }) => {
  const [nameQuery, setNameQuery] = useState('');
  const [titleQuery, setTitleQuery] = useState('');

  const filteredData = data.filter(item => {
    return (
      item.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
      item.title.toLowerCase().includes(titleQuery.toLowerCase())
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setNameQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => setTitleQuery(e.target.value)}
      />
      <Table data={filteredData} />
    </div>
  );
};

export default SearchFilterComponent;
