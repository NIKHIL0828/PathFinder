const router = require("express").Router();
const { generateRoadmap } = require("../controllers/roadmap.controller");

router.post("/", generateRoadmap);
module.exports = router;
