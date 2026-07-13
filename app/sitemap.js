import { getAllBriefs } from "../lib/briefs";

export default function sitemap() {
  const briefs = getAllBriefs();

  const briefUrls = briefs.map((brief) => ({
    url: `https://genaieducate.com/this-week-in-ai/${brief.date}`,
    lastModified: new Date(brief.generatedAt || `${brief.date}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: "https://genaieducate.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://genaieducate.com/this-week-in-ai",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://genaieducate.com/this-week-in-ai/archive",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...briefUrls,
  ];
}
