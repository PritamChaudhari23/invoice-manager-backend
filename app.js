// Main application file
// Currently using native MongoDB driver. For Mongoose version:
// - Change require("./src/db/database") to require("./src/db/database-mongoose")
// - Update routes to use mongoose controllers if needed

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoConnect = require("./src/db/database").connectToDatabase;
const invoiceRoutes = require("./src/routes/invoiceRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend live !!!");
});

app.use("/api/v1/invoice", invoiceRoutes);
app.use("/api/v1/user", userRoutes);

mongoConnect(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
