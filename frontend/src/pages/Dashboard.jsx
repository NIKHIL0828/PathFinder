// src/pages/Dashboard.jsx
import { useLocation, Navigate, Link } from "react-router-dom";
import SkillGapResult from "../components/SkillGapResult";
import RoadmapView from "../components/RoadmapView";
import TechNews from "../components/TechNews";

const Dashboard = () => {
  const location = useLocation();
  
  // If user tries to go to /dashboard directly without data, send them home
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { skillGap, roadmap, news, role } = location.state;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="dash-title">Analysis for: {role}</h1>
          <p className="dash-sub">Here is your personalized career breakdown.</p>
        </div>
        <Link to="/" className="btn-secondary">New Analysis</Link>
      </header>

      <div className="dashboard-grid">
        {/* Section 1: Skill Gap (Takes up large left chunk) */}
        <div className="grid-item skills-area">
          <h3>Skill Gap Analysis</h3>
          <SkillGapResult data={skillGap} />
        </div>

        {/* Section 2: Roadmap (Takes up right chunk) */}
        <div className="grid-item roadmap-area">
          <h3>Learning Roadmap</h3>
          <RoadmapView data={roadmap} />
        </div>

        {/* Section 3: News (Full width bottom) */}
        <div className="grid-item news-area">
          <h3>Industry Updates</h3>
          <TechNews stories={news} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;