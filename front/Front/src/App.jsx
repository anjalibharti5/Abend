// 4.
// App.jsx
import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import Select from 'react-select';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer';
import DataContentContainer from './components/DataContentContainer';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import data from './abendTest.abendData.json';

const App = () => {
  const [search1Date, setSearch1Date] = useState(null);
  const [search2Date, setSearch2Date] = useState(null);
  const [selectedProductFamily, setSelectedProductFamily] = useState(null);

  const handleReset = () => {
    setSearch1Date(null);
    setSearch2Date(null);
    setSelectedProductFamily(null);
  };

  return (
    <div className="App">
      <Header />
      <SearchContainer
        search1Date={search1Date}
        setSearch1Date={setSearch1Date}
        search2Date={search2Date}
        setSearch2Date={setSearch2Date}
        selectedProductFamily={selectedProductFamily}
        setSelectedProductFamily={setSelectedProductFamily}
        handleReset={handleReset}
      />
      <DataContentContainer data={data} />
    </div>
  );
};

export default App;



// 3.
// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import Select from 'react-select';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import './App.css';
// import abendData from './abendTest.abendData.json';

// const productFamilyOptions = [{ value: 'Supply Chain', label: 'Supply Chain' }];

// function App() {
//   const [data, setData] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [productFamily, setProductFamily] = useState('');
//   const [ipcActvProgram, setIpcActvProgram] = useState('');
//   const [transaction, setTransaction] = useState('');

//   const fetchData = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/abendData', {
//         'START DATE': startDate,
//         'END DATE': endDate,
//         'PRODUCT FAMILY': productFamily,
//         'IPC ACTV PROGRAM': ipcActvProgram,
//         'TRANSACTION': transaction,
//       });

//       setData(response.data.data.fetchedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [startDate, endDate, productFamily, ipcActvProgram, transaction]);

//   return (
//     <div className="App">
//       <div className="header">
//         <h1>prod-abend</h1>
//       </div>

//       <div className="data-header-container">
//         <div className="search-container">
//           <DatePicker
//             className="search-box"
//             placeholderText="Search 1 - Select Date"
//             dateFormat="yyyy-MM-dd"
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//           />
//           <DatePicker
//             className="search-box"
//             placeholderText="Search 2 - Select Date"
//             dateFormat="yyyy-MM-dd"
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//           />
//           <Select
//             className="search-box"
//             options={productFamilyOptions}
//             placeholder="Product Family"
//             onChange={(selectedOption) => setProductFamily(selectedOption.label)}
//           />

//           <button className="button" onClick={fetchData}>
//             Search
//           </button>
//           <button className="button">Reset</button>
//         </div>

//         <div className="data-content-container">
//           <div className="data-header">
//             <h2>Abend Data</h2>
//           </div>

//           <table className="table-container">
//             <thead>
//               <tr>
//                 <th>Entry</th>
//                 <th>Job Name</th>
//                 <th>Abend Code</th>
//                 <th>Abended Program</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>IPC ACTV PROGRAM</th>
//                 <th>IPC RTC</th>
//                 <th>All Programs Listed</th>
//                 <th>Product Family</th>
//                 <th>Transaction</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item._id.$oid}>
//                   <td>{item.ENTRY}</td>
//                   <td>{item['JOB NAME']}</td>
//                   <td>{item['ABEND CODE']}</td>
//                   <td>{item['ABENDED PROGRAM']}</td>
//                   <td>{new Date(item.DATE.$date).toDateString()}</td>
//                   <td>{item.TIME}</td>
//                   <td>{item['IPC ACTV PROGRAM']}</td>
//                   <td>{item['IPC RTC']}</td>
//                   <td>{item['ALL PGMS LISTED']}</td>
//                   <td>{item['PRODUCT FAMILY']}</td>
//                   <td>{item.TRANSACTION}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



// 1.
// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Papa from 'papaparse';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [productFamily, setProductFamily] = useState('');

//   const fetchData = () => {
//     Papa.parse("/path/to/abend_Data.csv", {
//       download: true,
//       header: true,
//       complete: (result) => {
//         setData(result.data);
//       },
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSearch = () => {
//     // Implement logic to filter data based on startDate, endDate, and productFamily
//     // Set filtered data to display
//   };

//   const handleReset = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setProductFamily('');
//     // Reset data to original state
//   };

//   return (
//     <div>
//       <div>
//         <label>Start Date:</label>
//         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//       </div>
//       <div>
//         <label>End Date:</label>
//         <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
//       </div>
//       <div>
//         <label>PRODUCT FAMILY:</label>
//         <input type="text" value={productFamily} onChange={(e) => setProductFamily(e.target.value)} />
//       </div>
//       <button onClick={handleSearch}>Search</button>
//       <button onClick={handleReset}>Reset</button>
//       {/* Display filtered data here */}
//     </div>
//   );
// };

// export default App;



// 2. src/App.js
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import Select from 'react-select';
// import 'react-datepicker/dist/react-datepicker.css';
// import './App.css';
// import data from './data.json';

// const productFamilyOptions = [
//   { value: 'Supply Chain', label: 'Supply Chain' },
// ];

// function App() {
//   // State variables for selected dates and product family
//   const [search1Date, setSearch1Date] = useState(null);
//   const [search2Date, setSearch2Date] = useState(null);
//   const [selectedProductFamily, setSelectedProductFamily] = useState(null);

//   // Reset function to clear the entered values
//   const handleReset = () => {
//     setSearch1Date(null);
//     setSearch2Date(null);
//     setSelectedProductFamily(null);
//   };

//   return (
//     <div className="App">
//       {/* Header Section */}
//       <div className="header">
//         <h1>prod-abend</h1>
//       </div>

//       {/* Container Section */}
//       <div className="data-header-container">
//         {/* Search Boxes with Calendar and Dropdown */}
//         <div className="search-container">
//           <DatePicker
//             className="search-box"
//             placeholderText="Search 1 - Select Date"
//             dateFormat="yyyy-MM-dd"
//             selected={search1Date}
//             onChange={(date) => setSearch1Date(date)}
//           />
//           <DatePicker
//             className="search-box"
//             placeholderText="Search 2 - Select Date"
//             dateFormat="yyyy-MM-dd"
//             selected={search2Date}
//             onChange={(date) => setSearch2Date(date)}
//           />
//           <Select
//             className="search-box"
//             options={productFamilyOptions}
//             placeholder="Product Family"
//             value={selectedProductFamily}
//             onChange={(selectedOption) => setSelectedProductFamily(selectedOption)}
//           />

//           <button className="button">Search</button>
//           <button className="button" onClick={handleReset}>Reset</button>
//         </div>

//         {/* Data Content Container */}
//         <div className="data-content-container">
//           <div className="data-header">
//             <h2>Abend Data:</h2>
//           </div>

//           {/* Table to display data */}
//           <table className="table-container">
//             <thead>
//               <tr>
//                 {/* Add table header columns based on your data */}
//                 <th>Entry</th>
//                 <th>Job Name</th>
//                 <th>Abend Code</th>
//                 <th>Abended Program</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>IPC ACTV PROGRAM</th>
//                 <th>IPC RTC</th>
//                 <th>All Programs Listed</th>
//                 <th>Product Family</th>
//                 <th>Transaction</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Map through the data array and display rows */}
//               {data.map((item) => (
//                 <tr key={item._id.$oid}>
//                   <td>{item.ENTRY}</td>
//                   <td>{item['JOB NAME']}</td>
//                   <td>{item['ABEND CODE']}</td>
//                   <td>{item['ABENDED PROGRAM']}</td>
//                   <td>{new Date(item.DATE.$date).toDateString()}</td>
//                   <td>{item.TIME}</td>
//                   <td>{item['IPC ACTV PROGRAM']}</td>
//                   <td>{item['IPC RTC']}</td>
//                   <td>{item['ALL PGMS LISTED']}</td>
//                   <td>{item['PRODUCT FAMILY']}</td>
//                   <td>{item.TRANSACTION}</td>
//                   {/* Add more fields as needed */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

