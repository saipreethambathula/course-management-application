const express = require("express");
const cors = require("cors")
const courseRoutes = require("./routes/courses");
const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth/register", registerRoute);
app.use("/api/auth/login", loginRoute);

app.use("/api/courses", courseRoutes);
app.use("/api/course", courseRoutes);

module.exports = app;
