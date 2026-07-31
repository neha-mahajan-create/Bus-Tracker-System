require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const busRoutes = require("./routes/busRoutes");
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const journeyRoutes = require("./routes/journeyRoutes");
const userManagementRoutes = require("./routes/userManagementRoutes");
const activityRoutes = require("./routes/activityRoutes");
const userDashboardRoutes = require("./routes/userDashboardRoutes");
const mapRoutes = require("./routes/mapRoutes");
const geocodeRoutes = require("./routes/geocodeRoutes");
const osrmRoutes = require("./routes/osrmRoutes");
const contactRoutes = require("./routes/contactRoutes");
const driverRoutes = require("./routes/driverRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/buses", busRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/journeys", journeyRoutes);
app.use("/api/users", userManagementRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/user-dashboard", userDashboardRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/geocode", geocodeRoutes);
app.use("/api", osrmRoutes);
app.use("/api/contact", contactRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Bus Tracker Backend Running");
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});