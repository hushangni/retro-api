const express = require("express");
const connectDB = require("./utils/db");
const app = express();

const { PORT } = require("./utils/constants");

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/years", require("./routes/years"));

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
