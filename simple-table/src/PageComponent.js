import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Table from './Table';
import Pagination from './Pagination';
import SearchBar from './SearchBar';



function PageComponent({ defaultPage }) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [titleQuery, setTitleQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const { pageNumber } = useParams();
  const [currentPage, setCurrentPage] = useState(
    defaultPage || parseInt(pageNumber, 10) || 1
  );
  const [data, setData] = useState([]);
  const itemsPerPage = 20;

  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.field.localeCompare(b.field); 
      }
      return b.field.localeCompare(a.field);
    });

    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle the sort order
  };
  
  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber, 10));
    }
  }, [pageNumber]);

  useEffect(() => {
    const loadCheckedState = () => {
      const checkedItems = JSON.parse(localStorage.getItem('checkedItems') || '{}');
      return checkedItems;
    };

    const checkedItems = loadCheckedState();

    fetch('/data.json')
      .then(response => response.json())
      .then(fetchedData => {
        const updatedData = fetchedData.map(item => ({
          ...item,
          isChecked: checkedItems[item.id] || false
        }));
        setData(updatedData);
      });
  }, []);

  useEffect(() => {
    const filtered = data.filter(item => 
      item.name.toLowerCase().includes(nameQuery.toLowerCase()) &&
      item.title.toLowerCase().includes(titleQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [nameQuery, titleQuery, data]);


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 1) {
      navigate(`/`);
    } else {
      navigate(`/page/${page}`);
    }
  };

  const handleCheckChange = (id, isChecked) => {
    const updatedData = filteredData.map(item => 
      item.id === id ? { ...item, isChecked } : item
    );
    setData(updatedData);

    const checkedItems = updatedData.reduce((acc, item) => {
      acc[item.id] = item.isChecked;
      return acc;
    }, {});
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  };



  return (
    <div>
      <SearchBar 
        onNameSearch={setNameQuery} 
        onTitleSearch={setTitleQuery} 
      />
      <Table data={selectedData} onCheckChange={handleCheckChange} sortData={sortData} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default PageComponent;
