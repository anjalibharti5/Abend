import React from "react";

const TableComponent = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Entry</th>
            <th>Job Name</th>
            <th>Abend Code</th>
            <th>Abended Program</th>
            <th>Date</th>
            <th>Time</th>
            <th>IPC Active Program</th>
            <th>IPC RTC</th>
            <th>All Programs Listed</th>
            <th>Product Family</th>
            <th>Transaction</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id.$oid}>
              <td>{item.ENTRY}</td>
              <td>{item["JOB NAME"]}</td>
              <td>{item["ABEND CODE"]}</td>
              <td>{item["ABENDED PROGRAM"]}</td>
              <td style={{ whiteSpace: 'nowrap' }}>{item.DATE}</td>
              <td>{item.TIME}</td>
              <td>{item["IPC ACTV PROGRAM"]}</td>
              <td>{item["IPC RTC"]}</td>
              <td>{item["IPC ACTV PROGRAM"]}</td>
              <td>{item["PRODUCT FAMILY"]}</td>
              <td>{item.TRANSACTION}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;