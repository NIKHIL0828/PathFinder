const skillsData = require("../data/skills.json");

const analyzeSkillGap = (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;

    if (!targetRole || !currentSkills) {
      return res.status(400).json({ message: "targetRole and currentSkills are required" });
    }

    const normalizedSkills = currentSkills.map(s => s.trim().toLowerCase());

    const roleData = skillsData[targetRole];
    if (!roleData) {
      return res.status(404).json({ message: "Role not found" });
    }

    const requiredSkills = roleData.requiredSkills || [];

    const matchedSkills = requiredSkills.filter(skill =>
      normalizedSkills.includes(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(
      skill => !normalizedSkills.includes(skill.toLowerCase())
    );

    const recommendations = [
      `Start with ${missingSkills[0] || matchedSkills[0]}, then continue sequentially.`
    ];

    const learningOrder = [...new Set([...matchedSkills, ...missingSkills])];

    res.json({
      matchedSkills,
      missingSkills,
      recommendations,
      learningOrder
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { analyzeSkillGap };
