const router = require("express").Router();
const { getTechNews } = require("../controllers/news.controller");

router.get("/", getTechNews);
module.exports = router;
