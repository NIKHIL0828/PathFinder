const SkillGapResult = ({ data }) => {
  if (!data) {
    return (
      <div className="empty-state">
        <p>Run an analysis to see your skill gap here.</p>
      </div>
    );
  }

  const { matchedSkills = [], missingSkills = [], learningOrder = [], recommendations = [] } = data;

  return (
    <div className="card">
      <h2 className="section-title">Skill Gap Overview</h2>
      <div className="chips-group">
        <div>
          <h3 className="chips-title">You already know</h3>
          <div className="chips">
            {matchedSkills.length ? (
              matchedSkills.map((skill) => (
                <span key={skill} className="chip chip-success">
                  {skill}
                </span>
              ))
            ) : (
              <span className="muted-text">No matching skills yet.</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="chips-title">You need to learn</h3>
          <div className="chips">
            {missingSkills.length ? (
              missingSkills.map((skill) => (
                <span key={skill} className="chip chip-warning">
                  {skill}
                </span>
              ))
            ) : (
              <span className="muted-text">No gaps detected.</span>
            )}
          </div>
        </div>
      </div>

      <div className="stack">
        <div>
          <h3 className="chips-title">Suggested learning order</h3>
          {learningOrder.length ? (
            <p className="learning-order">
              {learningOrder.join("  →  ")}
            </p>
          ) : (
            <p className="muted-text">We&apos;ll generate a learning path once you analyze.</p>
          )}
        </div>

        {recommendations.length > 0 && (
          <div>
            <h3 className="chips-title">Recommendations</h3>
            <ul className="recommendations">
              {recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGapResult;
