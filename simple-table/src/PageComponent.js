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
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data));
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

  return (
    <div>
      <Table data={selectedData} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default PageComponent;
