import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterComponent = ({
  startDate,
  endDate,
  productFamily,
  setStartDate,
  setEndDate,
  setProductFamily,
  handleSearch,
  handleReset,
}) => {
  return (
    <div className="search-container">
      <div>
        <DatePicker
          className="search-box"
          placeholderText="Search 1 - Select Date"
          selected={startDate}
          onChange={(date) => setStartDate(date)} />
      </div>
      <div>
        <DatePicker
          className="search-box"
          placeholderText="Search 2 - Select Date"
          selected={endDate}
          onChange={(date) => setEndDate(date)} />
      </div>
      <div>
        <select
          className="search-box"
          placeholder="Product Family"
          value={productFamily}
          onChange={(e) => setProductFamily(e.target.value)} />
      </div>

      <button className="button" onClick={handleSearch}>Search</button>
      <button className="button" onClick={handleReset}>Reset</button>
    </div>
  );
};

export default FilterComponent;
