// DataContentContainer.jsx
import React from 'react';
import Table from './Table';

const DataContentContainer = ({ data }) => {
  return (
    <div className="data-content-container">
        <div className="header">
            <h1>prod-abend</h1>
        </div>
        <Table data={data} />
    </div>
  );
};

export default DataContentContainer;
