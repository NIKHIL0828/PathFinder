const generateRoadmap = (req, res) => {
  try {
    const { targetRole } = req.body;

    if (!targetRole) {
      return res
        .status(400)
        .json({ message: "targetRole is required" });
    }

    const role = targetRole.trim().toLowerCase();

    // ---- DYNAMIC ROADMAPS ---- //
    const roadmaps = {
      "backend developer": {
        role: "Backend Developer",
        roadmap: {
          phase1: {
            title: "Foundations",
            duration: "1–2 months",
            items: ["Java basics", "OOP", "Git"],
          },
          phase2: {
            title: "Core Stack",
            duration: "2 months",
            items: ["Spring Boot", "SQL", "APIs"],
          },
          phase3: {
            title: "Advanced & Projects",
            duration: "1–2 months",
            items: ["Deployment", "Projects", "System Design basics"],
          },
        },
      },

      "frontend developer": {
        role: "Frontend Developer",
        roadmap: {
          phase1: {
            title: "Foundations",
            duration: "1–2 months",
            items: ["HTML", "CSS", "JavaScript"],
          },
          phase2: {
            title: "Core Stack",
            duration: "2 months",
            items: ["React", "Git", "APIs"],
          },
          phase3: {
            title: "Advanced & Projects",
            duration: "1–3 months",
            items: ["Next.js", "Deployment", "System Design basics"],
          },
        },
      },

      "full stack developer": {
        role: "Full Stack Developer",
        roadmap: {
          phase1: {
            title: "Foundations",
            duration: "1–3 months",
            items: ["HTML", "CSS", "JavaScript", "Git"],
          },
          phase2: {
            title: "Core Stack",
            duration: "2–3 months",
            items: ["React", "Node.js", "Express", "SQL/NoSQL"],
          },
          phase3: {
            title: "Advanced & Projects",
            duration: "1–3 months",
            items: ["Deployment", "System Design", "Microservices basics"],
          },
        },
      },

      "data scientist": {
        role: "Data Scientist",
        roadmap: {
          phase1: {
            title: "Math & Programming",
            duration: "1–2 months",
            items: ["Python", "Statistics", "NumPy/Pandas"],
          },
          phase2: {
            title: "ML Stack",
            duration: "2–3 months",
            items: ["Scikit-learn", "Data Cleaning", "ML Models"],
          },
          phase3: {
            title: "Advanced & Projects",
            duration: "1–3 months",
            items: ["Deep Learning basics", "Deployment", "Portfolio Projects"],
          },
        },
      },

      "devops engineer": {
        role: "DevOps Engineer",
        roadmap: {
          phase1: {
            title: "Foundations",
            duration: "1–2 months",
            items: ["Linux", "Git", "Networking basics"],
          },
          phase2: {
            title: "DevOps Tools",
            duration: "2–3 months",
            items: ["Docker", "CI/CD", "AWS/GCP basics"],
          },
          phase3: {
            title: "Advanced & Projects",
            duration: "1–3 months",
            items: ["Kubernetes", "Monitoring", "Deployment Projects"],
          },
        },
      },
    };

    // ----- SELECT MATCHING ROLE ----- //
    const selected = roadmaps[role];

    if (!selected) {
      return res.status(404).json({
        message: `No roadmap found for role: ${targetRole}`,
      });
    }

    res.json(selected);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateRoadmap };
