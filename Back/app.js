const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use("/", require("./routes/index"));

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
})
