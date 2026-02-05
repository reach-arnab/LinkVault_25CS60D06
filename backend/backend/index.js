
const express = require("express");
const cors = require("cors");
const shareRoutes = require("./routes/shareRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", shareRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
