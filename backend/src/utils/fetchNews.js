const axios = require("axios");

const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const ITEM_URL = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const TECH_KEYWORDS = [
  "tech","software","developer","engineering","programming","cloud",
  "aws","docker","linux","javascript","react","api","sql","cyber",
  "security","python","node","frontend","backend","startup","ai","ml",
  "database","infrastructure","devops"
];

function isTechStory(title = "") {
  title = title.toLowerCase();
  return TECH_KEYWORDS.some((k) => title.includes(k));
}

async function fetchTopStories(limit = 5) {
  try {
    // Fetch top 50 IDs to ensure enough filtering
    const { data: ids } = await axios.get(TOP_STORIES_URL);
    const first50 = ids.slice(0, 50);

    // Fetch all 50 IN PARALLEL
    const results = await Promise.all(
      first50.map((id) =>
        axios.get(ITEM_URL(id)).catch(() => null)
      )
    );

    // Clean -> filter -> tech only
    const techStories = results
      .map((res) => res?.data)
      .filter((d) => d && d.title && isTechStory(d.title));

    // If less than 5 -> fallback: take first 5 non-tech stories
    let finalStories = techStories.slice(0, limit);

    if (finalStories.length < limit) {
      const filler = results
        .map((res) => res?.data)
        .filter((d) => d && d.title)
        .slice(0, limit - finalStories.length);

      finalStories = [...finalStories, ...filler];
    }

    // Still ensure exactly 5
    return finalStories.slice(0, limit);
  } catch (err) {
    console.error("Tech news fetch error:", err);
    return [];
  }
}

module.exports = { fetchTopStories };
