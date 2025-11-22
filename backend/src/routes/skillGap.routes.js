const router = require("express").Router();
const { analyzeSkillGap } = require("../controllers/skillGap.controller");

router.post("/", analyzeSkillGap);
module.exports = router;
