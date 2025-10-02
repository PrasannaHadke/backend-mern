require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const contactRoute = require("./router/contact.route");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/errror.middleware')

// middlewares
app.use(cors()); // ✅ call the function
app.use(express.json());

// routes
app.use("/api/auth", router);
app.use("/api/form", contactRoute);

// error handler
app.use(errorMiddleware);


// connect to DB and start server
connectDb().then(() => {
  app.listen(8000, () => {
    console.log("Server Started at port 8000");
  });
});
