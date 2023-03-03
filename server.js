const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const path = require("path");

const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/cats", require("./routes/catRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/img", require("./routes/uploadRoutes"));
app.use("/contact", require("./routes/contactRoutes"));

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(port, () => console.log(`Server started on port ${port}`));
