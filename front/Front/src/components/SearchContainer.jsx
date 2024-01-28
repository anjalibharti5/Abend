// SearchContainer.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

const SearchContainer = ({ search1Date, setSearch1Date, search2Date, setSearch2Date, selectedProductFamily, setSelectedProductFamily, handleReset }) => {
  const productFamilyOptions = [
    { value: 'Supply Chain', label: 'Supply Chain' },
  ];

  return (
    <div className="search-container">
          <DatePicker
            className="search-box"
            placeholderText="Search 1 - Select Date"
            dateFormat="yyyy-MM-dd"
            selected={search1Date}
            onChange={(date) => setSearch1Date(date)}
          />
          <DatePicker
            className="search-box"
            placeholderText="Search 2 - Select Date"
            dateFormat="yyyy-MM-dd"
            selected={search2Date}
            onChange={(date) => setSearch2Date(date)}
          />
          <Select
            className="search-box"
            options={productFamilyOptions}
            placeholder="Product Family"
            value={selectedProductFamily}
            onChange={(selectedOption) => setSelectedProductFamily(selectedOption.label)}
          />

          <button className="button">Search</button>
          <button className="button" onClick={handleReset}>Reset</button>
          
    </div>
  );
};

export default SearchContainer;
