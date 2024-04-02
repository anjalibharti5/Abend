
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import DataDisplayComponent from "./components/DataDisplayComponent";
import api from "./services/api";
import Header from "./components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertDialog from "./components/AlertDialog";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

function App() {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      borderRadius: '10px',
      border: '2px solid black',
      boxShadow: 'none',
      boxSizing: 'border-box',
      width: '160px',
      margin: '6px auto',
      height: "30px",
      '&:placeholder': {
        color: 'black',
      },
    }),
    option: (styles, {isDisabled }) => ({
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'default',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productFamily, setProductFamily] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage,] = useState("");
  const [activeipc, setActiveipc] = useState("");
  const [error, setError] = useState(null);

  const options = [
    { value: 'Supply Chain', label: 'Supply Chain' },
    { value: 'Obsolete', label: 'Obsolete' },
    { value: 'TEQ Engineering', label: 'TEQ Engineering' },
    { value: 'TEQ Aircraft Records', label: 'TEQ Aircraft Records' },
    { value: 'Supply Chain (Finance)', label: 'Supply Chain (Finance)' },
    { value: 'TEQ Reliability', label: 'TEQ Reliability' },
    { value: 'SCEPTRE Platform', label: 'SCEPTRE Platform' },
    { value: 'Maintenance Planning', label: 'Maintenance Planning' },
    { value: 'TEQ Receiving', label: 'TEQ Receiving' },
    { value: 'Obsolete - could be modified and Line/Base/MOC', label: 'Obsolete - could be modified and Line/Base/MOC' },
    { value: 'Line Maintenance & Supply Chain', label: 'Line Maintenance & Supply Chain' },
    { value: 'TEQ Engineering (Not used in PROD', label: 'TEQ Engineering (Not used in PROD' },
    { value: 'BMP Module - Obsolete', label: 'BMP Module - Obsolete' },
    { value: 'TEQ Quality', label: 'TEQ Quality' },
    { value: 'Line Maintenance & Planning', label: 'Line Maintenance & Planning' },
    { value: 'TEQ Aircraft Records & QCRI', label: 'TEQ Aircraft Records & QCRI' },
    { value: 'Maintenance Operations Control', label: 'Maintenance Operations Control' },
    { value: 'Line Maintenance', label: 'Line Maintenance' },
    { value: 'Obsolete per Mike 8/3/21 - Line/', label: 'Obsolete per Mike 8/3/21 - Line/' },
    { value: 'SAFE Parts Receiving', label: 'SAFE Parts Receiving' },
    { value: 'Obsolete Per Mharper 8/5/21 Main', label: 'Obsolete Per Mharper 8/5/21 Main' },
    { value: 'Line & Base Maintenance', label: 'Line & Base Maintenance' }
  ];


  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch('http://localhost:5000/abendData');
        const result = await response.json();
        setFilteredData(result.data.fetchedData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData1();
  }, []);

  const fetchData = async () => {
    try {
      const filters = {};
      if (startDate) filters["START DATE"] = startDate;
      if (endDate) filters["END DATE"] = endDate;
      if (productFamily) filters["PRODUCT FAMILY"] = productFamily;
      if (activeipc) filters["PGM NAME"] = activeipc;
      const response = await api.fetchData(filters);
      setFilteredData(response.data.data.fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (!startDate && !endDate && !productFamily && !activeipc) {
        toast.error("Please enter at least one filter.");
        return;
      }
      await fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setProductFamily("");
    setActiveipc("");
    setFilteredData([]);
  };

  return (
    <div className="App">
      <Header />
      <div className="search-container">
        <div className="input-container">
          <DatePicker
            className="search-box"
            placeholderText="Select Start Date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd-MM-yyyy"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
          />
          <DatePicker
            className="search-box"
            placeholderText="Select End Date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd-MM-yyyy"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
          />
          <input
            type="text"
            id="IPC-ACTIVE-PGM"
            className="search-box"
            placeholder="PROGRAM NAME"
            value={activeipc}
            onChange={(e) => setActiveipc(e.target.value)}
          />
          <Select
            options={options}
            styles={colourStyles}
            menuPosition="fixed"
            onChange={(selected) => {
              setProductFamily(selected)
            }}
          />
        </div>
        <button className="button" onClick={handleSearch}>
          Search
        </button>
        <button className="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      {errorMessage && <AlertDialog message={errorMessage} />}
      <DataDisplayComponent filteredData={filteredData} />
      <ToastContainer />
    </div>
  );
}

export default App;
