const { fetchTopStories } = require("../utils/fetchNews");

const getTechNews = async (req, res) => {
  try {
    const stories = await fetchTopStories(5);
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

module.exports = { getTechNews };
