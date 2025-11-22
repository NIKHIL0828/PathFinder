// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import axios from "../api/axiosInstance";
import { ArrowRight, Target, Zap } from "lucide-react";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onAnalyze = async ({ targetRole, currentSkills }) => {
    console.log("Sending Data:", { targetRole, currentSkills });

    if (!targetRole?.trim() || !currentSkills?.length) {
      setError("Please provide both a target role and current skills.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Fetch all data independently
      const [skillRes, roadRes, newsRes] = await Promise.allSettled([
        axios.post("/api/skill-gap", { targetRole, currentSkills }),
        axios.post("/api/roadmap", { targetRole }),
        axios.get("/api/news"),
      ]);

      // Safely extract values (avoid frontend crash)
      const skillGap =
        skillRes.status === "fulfilled" ? skillRes.value.data : null;

      const roadmap =
        roadRes.status === "fulfilled" ? roadRes.value.data : null;

      const news =
  newsRes.status === "fulfilled" && Array.isArray(newsRes.value.data)
    ? [...newsRes.value.data]  // force fresh copy
    : [];
    
      // Navigate to dashboard
      navigate("/dashboard", {
        state: {
          skillGap,
          roadmap,
          news,
          role: targetRole,
        },
      });
    } catch (err) {
      console.error(err);
      setError("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">
          Map Your <span className="highlight">Tech Career</span>
        </h1>
        <p className="hero-subtitle">
          AI-powered analysis to bridge your skill gaps and build a personalized roadmap.
        </p>

        <div className="features-grid">
          <div className="feature">
            <Target size={20} /> <span>Precise Skill Gaps</span>
          </div>
          <div className="feature">
            <Zap size={20} /> <span>AI Roadmaps</span>
          </div>
        </div>

        <div className="card input-card">
          <InputForm onAnalyze={onAnalyze} isLoading={loading} />
          {error && <div className="error-banner">{error}</div>}
        </div>
      </section>
    </div>
  );
}

export default Home;
