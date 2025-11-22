const express = require("express");
const cors = require("cors");

const skillGapRoutes = require("./routes/skillGap.routes");
const roadmapRoutes = require("./routes/roadmap.routes");
const newsRoutes = require("./routes/news.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/news", newsRoutes);

module.exports = app;
