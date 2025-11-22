import { useState } from "react";

const ROLE_OPTIONS = [
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Mobile App Developer",
];

const SKILL_SUGGESTIONS = {
  "Backend Developer": ["Node.js", "Express.js", "SQL", "APIs", "Git"],
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git", "Next.js"],
  "Full Stack Developer": [
    "Node.js",
    "Express.js",
    "MongoDB",
    "React",
    "REST APIs",
    "Git",
  ],
  "DevOps Engineer": ["Linux", "Docker", "Kubernetes", "AWS", "CI/CD", "Git"],
  "Mobile App Developer": [
    "React Native",
    "Flutter",
    "Java/Kotlin",
    "APIs",
    "Firebase",
    "Git",
  ],
};

const InputForm = ({ onAnalyze, isLoading }) => {
  const [role, setRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setSelectedSkills([]); // reset skills when changing role
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze({ targetRole: role, currentSkills: selectedSkills });
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      {/* Target Role Dropdown */}
      <label className="field">
        <span className="field-label">Target Role</span>
        <select value={role} onChange={handleRoleChange} className="text-input">
          <option value="">Select a role...</option>
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      {/* Skill Multi Select */}
      {role && (
        <label className="field">
          <span className="field-label">Select Your Current Skills</span>

          <div className="skill-dropdown">
            {SKILL_SUGGESTIONS[role].map((skill) => (
              <label key={skill} className="skill-item">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>

          <span className="field-hint">
            Choose the skills you already know. We’ll detect missing skills.
          </span>
        </label>
      )}

      {/* Analyze Button */}
      <button className="primary-button" type="submit" disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze My Career Path"}
      </button>
    </form>
  );
};

export default InputForm;
