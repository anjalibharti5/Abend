const fs = require("fs");

const abendData = JSON.parse(
  fs.readFileSync(`${__dirname}/../abendTest_abendData.json`)
);

exports.filterData = async (req, res) => {
  try {
    const queryparams = { ...req.body };
    let allData = abendData;

    if (
      queryparams.hasOwnProperty("PRODUCT FAMILY") &&
      queryparams["PRODUCT FAMILY"]
    ) {
      const filterRegex = RegExp(queryparams["PRODUCT FAMILY"], "gi");
      allData = allData.filter((record) =>
        record["PRODUCT FAMILY"].match(filterRegex)
      );
    }
    if (queryparams.hasOwnProperty("IPC ACTV PROGRAM")) {
      const filterRegex = RegExp(queryparams["IPC ACTV PROGRAM"], "gi");
      allData = allData.filter((record) =>
        record["IPC ACTV PROGRAM"].match(filterRegex)
      );
      // allData = allData.filter(
      //   (record) =>
      //     record["IPC ACTV PROGRAM"] === queryparams["IPC ACTV PROGRAM"]
      // );
    }
    if (queryparams.hasOwnProperty("TRANSACTION")) {
      const filterRegex = RegExp(queryparams["TRANSACTION"], "gi");
      allData = allData.filter((record) =>
        record["TRANSACTION"].match(filterRegex)
      );
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

    allData = allData.filter((record) => new Date(record["DATE"]) >= startDate);
    allData = allData.filter((record) => new Date(record["DATE"]) < endDate);

    const fetchedData = await allData;

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
    const fetchedData = await abendData;
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
    const newData = req.body;
    const inserted = await abendData.push(req.body);

    res.status(200).json({
      status: "success",
      data: {
        newData,
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
    const fetchedData = await abendData.filter(
      (record) => record["ENTRY"] === entry
    );

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
    const fetchedData = await abendData.filter(
      (record) => record["ENTRY"] === entry
    );
    const index = abendData.indexOf(fetchedData);
    if (index > -1) {
      abendData.splice(index, 1);
    }
    const newData = req.body;
    const updatedData = await abendData.push(req.body);

    res.status(200).json({
      status: "success",
      data: {
        newData,
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
    const fetchedData = await abendData.filter(
      (record) => record["ENTRY"] === entry
    );
    const index = abendData.indexOf(fetchedData);
    if (index > -1) {
      abendData.splice(index, 1);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};
