import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageComponent from './PageComponent';

function App() {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PageComponent defaultPage={1} />} />
        <Route path="/page/:pageNumber" element={<PageComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
