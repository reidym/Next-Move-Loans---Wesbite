import { getService, services, type ServiceCategoryId, type ServicePageData } from "@/lib/siteData";

const firstInvestment: ServicePageData = {
  slug: "first-investment",
  title: "First Investment Property",
  category: "investment",
  eyebrow: "YOUR FIRST INVESTMENT",
  short: "Build the first investment around borrowing capacity, cash flow and the option to buy again later.",
  challenge: "Your first investment property should be the first step in a portfolio—not the loan that makes the second one harder.",
  intro: "We map deposit or equity, borrowing capacity, repayments, lender choice and the likely next move before you commit to a property.",
  fit: ["Buying your first investment property", "Using equity from your home", "Wanting to understand how the first investment affects future borrowing"],
  decisions: [
    "How much can I safely spend on my first investment?",
    "Should I use cash or equity from my home for the deposit?",
    "How much borrowing capacity could be left after this purchase?",
    "Should the loan be interest-only or principal-and-interest?",
    "Which lender should I use first if I want to buy again later?",
    "How much cash buffer should I keep after settlement?",
  ],
  faq: [
    { question: "How much deposit do I need for a first investment property?", answer: "It depends on the property, lender, available equity and your overall position. We calculate the cash or equity required, purchase costs and the buffer left after settlement before settling on a target range." },
    { question: "Can I use equity in my home as the deposit?", answer: "Potentially. Usable equity and borrowing capacity are separate tests. We look at how much may be available, whether releasing it improves the strategy and how the additional debt should be structured." },
    { question: "Does rental income increase borrowing power dollar for dollar?", answer: "Usually not. Lenders generally shade rental income and apply their own servicing assumptions to existing and proposed debts. The same property and household can produce different borrowing results with different lenders." },
    { question: "Should my first investment loan be interest-only?", answer: "It can suit some strategies, but it is not automatically better. We compare repayments, cash flow, pricing, the interest-only period and what happens when repayments revert to principal-and-interest. Tax advice should come from your accountant." },
    { question: "Should I use the same bank as my home loan?", answer: "Not automatically. Convenience is only one factor. Lender sequencing, future borrowing capacity, pricing, security structure and flexibility can matter if you intend to build a portfolio." },
    { question: "What should I have ready before we talk?", answer: "Your current home-loan balances, income, approximate savings, credit limits, expected purchase range and any existing property details are enough for an initial conversation. We will tell you what evidence is needed next." },
  ],
  cta: "Build Your First Investment Game Plan",
};

const cloneWithOverrides = (service: ServicePageData, overrides: Partial<ServicePageData>): ServicePageData => ({ ...service, ...overrides });

export function getWebsiteService(slug?: string): ServicePageData | undefined {
  if (slug === "first-investment") return firstInvestment;
  const service = getService(slug);
  if (!service) return undefined;
  if (slug === "equity") {
    return cloneWithOverrides(service, {
      title: "Equity Release",
      eyebrow: "USE EQUITY WITH A PURPOSE",
      short: "Access available equity for a defined next move without treating it like free money.",
      challenge: "The useful question is not how much equity you can release. It is what the extra debt is meant to achieve.",
    });
  }
  if (slug === "investment-property-loans") {
    return cloneWithOverrides(service, {
      title: "Next Investment Property",
      eyebrow: "BUILD THE NEXT MOVE",
      short: "Add the next property without losing sight of lender sequencing, borrowing capacity and portfolio structure.",
      challenge: "Your next property should move the portfolio forward—not create the next borrowing problem.",
    });
  }
  return service;
}

export function getWebsiteCategoryServices(category: ServiceCategoryId): ServicePageData[] {
  const base = services.filter(service => service.category === category).map(service => getWebsiteService(service.slug)!).filter(Boolean);
  if (category !== "investment") return base;
  return [
    firstInvestment,
    ...base,
  ];
}
