const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect successful");
  })
  .catch(console.log);

const app = express();
app.use(express.json());

app.use("/images", express.static("./uploads"));

app.use("/api/stations/", require("./routes/api/controller/stations"));
app.use("/api/trip/", require("./routes/api/controller/trip"));
app.use("/api/user/", require("./routes/api/controller/user"));
app.use("/api/ticket/", require("./routes/api/controller/tickets"));

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
