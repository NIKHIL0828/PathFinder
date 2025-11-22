const RoadmapView = ({ data }) => {
  if (!data) {
    return (
      <div className="card empty-state">
        <p>Your 3-phase roadmap will appear here.</p>
      </div>
    );
  }

  const { role, roadmap } = data;

  return (
    <div className="card">
      <h2 className="section-title">Career Roadmap</h2>
      <p className="section-subtitle">
        Structured path to grow into a strong {role}.
      </p>

      <div className="roadmap-grid">
        {Object.entries(roadmap || {}).map(([key, phase]) => (
          <div key={key} className="roadmap-phase">
            <p className="phase-label">{key.toUpperCase()}</p>
            <h3 className="phase-title">{phase.title}</h3>
            {phase.duration && (
              <p className="phase-duration">Duration: {phase.duration}</p>
            )}
            <ul className="phase-list">
              {phase.items?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;
