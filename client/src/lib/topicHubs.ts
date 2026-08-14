export type TopicArticle = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  audience?: string;
  decision?: string;
  tags?: string[];
};

export type TopicHub = {
  slug: string;
  label: string;
  eyebrow: string;
  description: string;
  challenge: string;
  keywords: string[];
};

export const topicHubDefinitions: TopicHub[] = [
  { slug: "first-home", label: "First home", eyebrow: "STARTING WELL", description: "Decisions about deposits, capacity, timing and the structure that should still work after settlement.", challenge: "The first loan should not close the door on the second move.", keywords: ["first home", "first-home", "buying"] },
  { slug: "next-home", label: "Next home", eyebrow: "UPGRADING", description: "Selling, keeping, bridging, building and protecting flexibility while the next home takes shape.", challenge: "More home should not automatically mean fewer future options.", keywords: ["next home", "upgrading", "upgrade", "bridging", "sell before"] },
  { slug: "investment", label: "Investment", eyebrow: "BUILDING CAPACITY", description: "Equity, serviceability, lender sequence and the structure behind the first or next investment property.", challenge: "A lender limit is not always the end of the strategy.", keywords: ["investment", "investing", "investor", "portfolio"] },
  { slug: "regional-rural", label: "Regional & rural", eyebrow: "PROPERTY ACCEPTABILITY", description: "Acreage, zoning, access, construction, regional moves and the details that change how a lender sees the property.", challenge: "A home to you can be non-standard security to a lender.", keywords: ["regional", "rural", "acreage", "country"] },
  { slug: "business", label: "Business", eyebrow: "FUNDING OPPORTUNITY", description: "Growth, working capital, premises and the evidence that helps a lender understand what the business can create next.", challenge: "A profitable business can still tell the wrong story on paper.", keywords: ["business", "commercial", "working capital", "premises"] },
  { slug: "assets", label: "Assets", eyebrow: "PUTTING EQUIPMENT TO WORK", description: "Vehicles, equipment and machinery decisions that balance ownership, cash flow and productive use.", challenge: "The useful comparison is not simply cash versus finance.", keywords: ["asset", "assets", "equipment", "vehicle", "machinery"] },
  { slug: "refinancing", label: "Refinancing", eyebrow: "RESETTING THE STRUCTURE", description: "Rate, debt, equity and loan-structure decisions viewed through what the new arrangement should improve.", challenge: "A headline rate is not a household strategy.", keywords: ["refinance", "refinancing", "rate", "debt", "equity"] },
];

const articleIndex = (article: TopicArticle) => [article.title, article.summary, article.category, article.audience, article.decision, ...(article.tags ?? [])].filter(Boolean).join(" ").toLowerCase();

export const topicHubMatchesArticle = (hub: TopicHub, article: TopicArticle) => {
  const index = articleIndex(article);
  return hub.keywords.some(keyword => index.includes(keyword));
};

export const buildActiveTopicHubs = (articles: TopicArticle[]) => topicHubDefinitions.map(hub => ({ ...hub, articles: articles.filter(article => topicHubMatchesArticle(hub, article)) })).filter(hub => hub.articles.length > 0);

export const getTopicHub = (slug?: string) => topicHubDefinitions.find(hub => hub.slug === slug);

