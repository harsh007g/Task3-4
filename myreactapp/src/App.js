import './App.css';

import React, { useState, useEffect,  useRef } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataComponent />
      </header>
    </div>
  );
}

function DataComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const ref = useRef("")

  useEffect(() => {
    axios.get('http://127.0.0.1:3002/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // console.log('dataComponent: ', data);
  const handleSearch = () => {
    setSearchTerm(ref.current.value);
    console.log(ref.current.value)
  };

  const filteredData = data.filter(item => {
    return (
            JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Price.replace(",", "").replace(" ", "") === searchTerm ||
            item.Rating.replace(".","") === searchTerm 
    )
  });
    // eslint-disable-next-line
  // const optimizedFn = useCallback(debounce(handleSearch, 1000), []);

const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        
        onClick={handlePageClick}
        className={currentPage === number ? "active" : "page-btn"}
      >
      {number}
      </li>
    );
  });

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };  

  if(data.length > 0) {
    return (
      <>
        <input 
          ref={ref}
          type="text"
          placeholder="Search..."
          onChange={(e) => debounce(handleSearch, 1000)(e)}
        />
        <Table TableRowsdata={currentRows} data={data} />
        <div className="pagination">
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </div>
        
      </>
   ); 
  } else {
    return <div className="loading">Loading...</div>;
  }
}

function Table({ TableRowsdata, data }) {
  const headers = Object.keys(data[0]);

  const rows = TableRowsdata.map((row, index) => {
    const cells = headers.map(header => {
      return <td key={header + index}>{row[header]}</td>;
    });
    return <tr key={index}>{cells}</tr>;
  });

  return (
    
    <table>
      <thead>
        <tr>
          {headers.map(header => {
            return <th key={header}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default App;