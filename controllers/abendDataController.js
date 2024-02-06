const AbendData = require("./../models/abendDataModel");

exports.filterData = async (req, res) => {
  try {
    const queryparams = { ...req.body };
    let query = {};

    if (queryparams.hasOwnProperty("PRODUCT FAMILY")) {
      query["PRODUCT FAMILY"] = { $regex: new RegExp(queryparams["PRODUCT FAMILY"], 'i') };
    }
    
    if (queryparams.hasOwnProperty("IPC ACTV PROGRAM")) {
      query["IPC ACTV PROGRAM"] = queryparams["IPC ACTV PROGRAM"];
    }
    if (queryparams.hasOwnProperty("TRANSACTION")) {
      query["TRANSACTION"] = {
        $regex: queryparams["TRANSACTION"],
        $options: "i",
      };
    }

    //date query
    let startDate = new Date("2023-06-08"); //default start date as no records before this
    let endDate = new Date(); //default end date is current date

    if (queryparams.hasOwnProperty("START DATE")) {
      startDate = new Date(queryparams["START DATE"]);
    }
    if (queryparams.hasOwnProperty("END DATE")) {
      endDate = new Date(queryparams["END DATE"]);
    }

    endDate.setDate(endDate.getDate() + 1);
    query["DATE"] = {
      $gte: startDate,
      $lt: endDate,
    };

    // console.log(query);

    const fetchedData = await AbendData.find(query);

    res.status(200).json({
      status: "success",
      results: fetchedData.length,
      data: {
        fetchedData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const fetchedData = await AbendData.find();
    res.status(200).json({
      status: "success",
      result: fetchedData.length,
      data: {
        fetchedData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

exports.addNewData = async (req, res) => {
  try {
    const inserted = await AbendData.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        inserted,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

exports.getByEntry = async (req, res) => {
  try {
    const entry = req.params.entry * 1;
    const fetchedData = await AbendData.find({ ENTRY: entry });

    res.status(200).json({
      status: "success",
      result: fetchedData.length,
      data: {
        fetchedData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const entry = req.params.entry * 1;
    const fetchedData = await AbendData.find({ ENTRY: entry });
    const updatedData = await AbendData.findByIdAndUpdate(
      fetchedData[0]["_id"],
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        updatedData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entry = req.params.entry * 1;
    const fetchedData = await AbendData.find({ ENTRY: entry });
    await AbendData.findByIdAndDelete(fetchedData[0]["_id"]);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {6
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};





// 1------------------------------------------------------------------------------
// const AbendData = require("./../models/abendDataModel");
 
// exports.filterData = async (req, res) => {
//   try {
//     const queryparams = { ...req.body };
//     let query = {};
 
//     if (queryparams.hasOwnProperty("PRODUCT FAMILY")) {
//       query["PRODUCT FAMILY"] = {
//         $regex: queryparams["PRODUCT FAMILY"],
//         $options: "i",
//       };
//     }
//     if (queryparams.hasOwnProperty("IPC ACTV PROGRAM")) {
//       query["IPC ACTV PROGRAM"] = queryparams["IPC ACTV PROGRAM"];
//     }
//     if (queryparams.hasOwnProperty("TRANSACTION")) {
//       query["TRANSACTION"] = {
//         $regex: queryparams["TRANSACTION"],
//         $options: "i",
//       };
//     }
 
//     //date query
//     let startDate = new Date("2023-06-08"); //default start date as no records before this
//     let endDate = new Date(); //default end date is current date
 
//     if (queryparams.hasOwnProperty("START DATE")) {
//       startDate = new Date(queryparams["START DATE"]);
//     }
//     if (queryparams.hasOwnProperty("END DATE")) {
//       endDate = new Date(queryparams["END DATE"]);
//     }
 
//     endDate.setDate(endDate.getDate() + 1);
//     query["DATE"] = {
//       $gte: startDate,
//       $lt: endDate,
//     };
 
//     // console.log(query);
 
//     const fetchedData = await AbendData.find(query);
 
//     res.status(200).json({
//       status: "success",
//       results: fetchedData.length,
//       data: {
//         fetchedData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error,
//     });
//   }
// };
 
// exports.getAllData = async (req, res) => {
//   try {
//     const fetchedData = await AbendData.find();
//     res.status(200).json({
//       status: "success",
//       result: fetchedData.length,
//       data: {
//         fetchedData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error,
//     });
//   }
// };
 
// exports.addNewData = async (req, res) => {
//   try {
//     const inserted = await AbendData.create(req.body);
 
//     res.status(200).json({
//       status: "success",
//       data: {
//         inserted,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error,
//     });
//   }
// };
 
// exports.getByEntry = async (req, res) => {
//   try {
//     const entry = req.params.entry * 1;
//     const fetchedData = await AbendData.find({ ENTRY: entry });
 
//     res.status(200).json({
//       status: "success",
//       result: fetchedData.length,
//       data: {
//         fetchedData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error,
//     });
//   }
// };
 
// exports.updateEntry = async (req, res) => {
//   try {
//     const entry = req.params.entry * 1;
//     const fetchedData = await AbendData.find({ ENTRY: entry });
//     const updatedData = await AbendData.findByIdAndUpdate(
//       fetchedData[0]["_id"],
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
 
//     res.status(200).json({
//       status: "success",
//       data: {
//         updatedData,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error,
//     });
//   }
// };
 
// exports.deleteEntry = async (req, res) => {
//   try {
//     const entry = req.params.entry * 1;
//     const fetchedData = await AbendData.find({ ENTRY: entry });
//     await AbendData.findByIdAndDelete(fetchedData[0]["_id"]);
 
//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "error",
//       message: error,
//     });
//   }
// };
