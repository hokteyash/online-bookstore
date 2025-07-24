const express = require("express");
const dbConnect = require("./config/dbConnect");

const app = express();

require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json()); // to parse the incoming body request

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173", // allow frontend origin
    credentials: true, // allow cookies if you're using them
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", orderRoutes);

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
