const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const abendDataRoutes = require("./routes/abendDataRoutes");
 
app.use(express.json());
 
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
 
let DBHosted = process.env.MONGOURI.replace("<PASSWORD>", process.env.PASSWORD);
let DBLocal = process.env.MONGOLOCAL;
let DB = DBHosted;
 
//for logging in dev env
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  // DB = DBLocal;
}
 
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => {
    console.log("Conection successful");
    console.log(con.connections);
  })
  .catch((err) => {
    console.log(err);
  });
 
app.use("/", abendDataRoutes);
 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});














// -------------------------------------------------------------------------------------------------------
// const express = require("express");
// const app = express();

// const morgan = require("morgan");

// app.use(express.json());

// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

// // mongo connection
// const mongoose = require("mongoose");

// let DBHosted = process.env.MONGOURI.replace("<PASSWORD>", process.env.PASSWORD);
// let DBLocal = process.env.MONGOLOCAL;

// let DB = DBHosted;

// //for logging in dev env
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
//   // DB = DBLocal;
// }

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//   })
//   .then((con) => {
//     console.log("Conection successful");
//     console.log(con.connections);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.use("/", require("./routes/index"));





// app.get('/healthcheck', (req, res) => {
//    const data = {
//      ts: new Date(),
//      buildNumber:'101',
//      serviceName:'abc',
//    };
//    return res.json(data);
//  });



// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}...`);
// });

















//---------------------------------------------------------------------------------------------------------------------

// This is the previous code of (config.env)
 
// NODE_ENV = development
// MONGOURI = mongodb+srv://utsaghosh2:<PASSWORD>@cluster0.4mmqoww.mongodb.net/abendTest?retryWrites=true&w=majority
// PASSWORD = E6QOB9f9ZTApcMMS
// MONGOLOCAL = mongodb://localhost:27017/abendTest
// PORT = 3000