const TechNews = ({ stories }) => {
  if (!stories || stories.length === 0) {
    return (
      <div className="card empty-state">
        <p>No tech news available right now.</p>
      </div>
    );
  }

  return (
    <div className="card fade-in">
      <h2 className="section-title">Latest Tech News</h2>
      <p className="section-subtitle">Top 5 trending stories from HackerNews</p>

      <ul className="news-list">
        {stories.map((story) => (
          <li key={story.id} className="news-item">
            
            <div className="news-left">
              <a
                href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                target="_blank"
                rel="noreferrer"
                className="news-title"
              >
                {story.title}
              </a>

              <div className="news-meta">
                🌟 <strong>{story.score}</strong> points  
                &nbsp;•&nbsp;  
                🙎‍♂️ {story.by}  
                &nbsp;•&nbsp;  
                 ⌛{new Date(story.time * 1000).toLocaleDateString()}
              </div>
            </div>

            <span className="news-tag">{story.type?.toUpperCase()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechNews;
