import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Table from './Table';
import Pagination from './Pagination';

function PageComponent({ defaultPage }) {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const [currentPage, setCurrentPage] = useState(
    defaultPage || parseInt(pageNumber, 10) || 1
  );
  const [data, setData] = useState([]);
  const itemsPerPage = 20;

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

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 1) {
      navigate(`/`);
    } else {
      navigate(`/page/${page}`);
    }
  };

  const handleCheckChange = (id, isChecked) => {
    const updatedData = data.map(item => 
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
      <Table data={selectedData} onCheckChange={handleCheckChange} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default PageComponent;
