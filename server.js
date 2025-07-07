const express = require("express");
const dbConnect = require("./config/dbConnect");

const app = express();

require("dotenv").config();

const bodyParser = require('body-parser');

app.use(bodyParser.json());  // to parse the incoming body request

const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT;

app.use('/api/auth',authRoutes);

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
