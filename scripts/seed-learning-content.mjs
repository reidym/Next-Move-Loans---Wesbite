import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const brokerPageSections = [
  { heading: "Berwick beginnings", body: "Marty began his broking business in Berwick before moving to Leongatha to reconnect with his country roots and build a full-service finance business around real choice." },
  { heading: "Better advice changed the level of the game", body: "The experience shaped a simple belief: useful advice should leave people with more clarity, more confidence and a stronger view of what the next decision can make possible." },
  { heading: "The enemy is uncertainty", body: "Next Move Loans exists to help people move beyond not knowing where to start, what may be possible or who to trust." },
];

await connection.execute(
  `INSERT INTO pages (pageType, slug, title, eyebrow, excerpt, sections, status, publishAt, indexable, seoTitle, metaDescription, ctaKey)
   VALUES ('broker', 'martin-reidy', 'Martin Reidy', 'FOUNDER / MORTGAGE BROKER', ?, ?, 'published', '2026-08-13 00:00:00', true, 'Martin Reidy | Next Move Loans', ?, 'plan-your-next-move')
   ON DUPLICATE KEY UPDATE title=VALUES(title), eyebrow=VALUES(eyebrow), excerpt=VALUES(excerpt), sections=VALUES(sections), status=VALUES(status), publishAt=VALUES(publishAt), indexable=VALUES(indexable), seoTitle=VALUES(seoTitle), metaDescription=VALUES(metaDescription), ctaKey=VALUES(ctaKey)`,
  ["Marty built Next Move Loans to replace uncertainty with better questions, clearer strategy and real choice.", JSON.stringify(brokerPageSections), "Meet Martin Reidy, founder of Next Move Loans, and learn why clarity, choice and better advice sit behind the business."],
);
const [[brokerPage]] = await connection.query("SELECT id FROM pages WHERE slug='martin-reidy' LIMIT 1");
await connection.execute(
  `INSERT INTO brokers (pageId, fullName, roleTitle, biography, qualifications, expertise, serviceAreas, phone, email, bookingUrl, active)
   VALUES (?, 'Martin Reidy', 'Founder & Mortgage Broker', ?, ?, ?, ?, '0417 690 985', 'unlock@nextmoveloans.com.au', 'https://calendly.com/martin-reidy/discovery-call', true)
   ON DUPLICATE KEY UPDATE fullName=VALUES(fullName), roleTitle=VALUES(roleTitle), biography=VALUES(biography), qualifications=VALUES(qualifications), expertise=VALUES(expertise), serviceAreas=VALUES(serviceAreas), phone=VALUES(phone), email=VALUES(email), bookingUrl=VALUES(bookingUrl), active=true`,
  [brokerPage.id, brokerPageSections.map(section => section.body).join("\n\n"), JSON.stringify(["Diploma of Finance and Mortgage Broking Management", "Master of Business Administration", "Bachelor of Business", "Mortgage broker since 2020"]), JSON.stringify(["Upgrading and buy-before-sell strategy", "Investment capacity and equity", "Business-owner and complex-income lending", "Regional, acreage, commercial and asset finance"]), JSON.stringify(["Leongatha", "Warragul", "Berwick", "Victoria", "Australia-wide by arrangement"])],
);
const [[broker]] = await connection.query("SELECT id FROM brokers WHERE pageId=? LIMIT 1", [brokerPage.id]);

const articles = [
  {
    slug: "borrowing-limit-or-lenders-limit", title: "Have you reached your borrowing limit—or just your lender’s limit?", audience: "EMERGING PROPERTY BUILDER", topic: "Investing",
    summary: "Serviceability is not one universal number. Policy, sequence and structure can change the answer—and the risks.", service: "portfolio-lending", tags: ["Investing", "Borrowing capacity", "Lender policy", "Loan sequence", "Equity"], status: "published", indexable: true,
    sections: [
      { heading: "One calculation is not the whole market", body: "Lenders can treat income, existing debt, rental income, expenses and loan terms differently. A decline or a lower figure describes one policy outcome. It does not automatically describe every responsible pathway." },
      { heading: "More borrowing is not automatically the win", body: "The useful question is whether another loan still fits the cash flow, buffers, goals and tolerance for change. Strategy is not the search for the largest number. It is the search for the strongest next position." },
      { heading: "Sequence has consequences", body: "The lender used now, the way existing loans are structured and where security is held can affect future flexibility. Review the portfolio before a short-term approval becomes a long-term constraint." },
      { heading: "The next question", body: "What would the next purchase need to leave possible after settlement? Start there, then work backwards through capacity, equity, buffer and lender fit." },
    ],
  },
  {
    slug: "sell-before-you-buy", title: "Should you sell your home before buying the next one?", audience: "AMBITIOUS UPGRADER", topic: "Upgrading",
    summary: "There is no universal order. The better sequence depends on timing, buffers, sale risk, borrowing capacity and how specific the next property needs to be.", service: "bridging-finance", tags: ["Upgrading", "Bridging finance", "Sell first", "Buy first", "Equity"], status: "published", indexable: true,
    sections: [
      { heading: "Selling first creates certainty—and a different risk", body: "A completed sale can clarify available funds and remove the pressure of carrying two properties. It can also create temporary accommodation, a rushed purchase or a narrow window to find the right home." },
      { heading: "Buying first creates flexibility—and peak debt", body: "A buy-first or bridging structure may make the move possible before the sale. Peak exposure, interest, valuation, time assumptions and the exit path all need to be visible before the offer is made." },
      { heading: "The familiar answer may not be the safest one", body: "Keeping the current home because it feels valuable, or selling it because the process feels simpler, can both be reasonable. Neither should happen by default. Compare the practical move and the financial position together." },
      { heading: "Model the sequence", body: "Use realistic sale outcomes, timeframes and buffers. The better answer is the one that manages both the financial pressure and the life around the move." },
    ],
  },
  {
    slug: "buying-acreage-check-first", title: "Buying acreage? Check this before falling in love with the property.", audience: "REGIONAL LIFESTYLE MOVER", topic: "Regional",
    summary: "Land size, zoning, access, improvements and intended use can influence how a lender sees the security.", service: "acreage-rural-finance", tags: ["Regional", "Acreage", "Rural property", "Valuation", "Security"], status: "published", indexable: true,
    sections: [
      { heading: "A residential address is not always standard security", body: "A property can look like a home to the buyer and still receive different lender treatment because of land size, location, access, services, sheds, income-producing use or unusual improvements." },
      { heading: "Ask property questions before finance becomes urgent", body: "A contract deadline is a poor time to discover a valuation concern or policy restriction. Share the address, listing, intended use and relevant improvements early enough to investigate." },
      { heading: "Lifestyle and structure belong in the same plan", body: "Deposit, buffer, renovation needs, equipment, commuting and future business or investment goals can all change the right structure. The dream property should not make every later decision harder." },
    ],
  },
  {
    slug: "profitable-business-bank-says-no", title: "Your business is profitable. So why does the bank say you cannot borrow?", audience: "BUSINESS OWNER BUILDING MORE", topic: "Business",
    summary: "Business performance, taxable income and assessable lending income are connected—but they are not identical.", service: "business-finance", tags: ["Business", "Self-employed", "Financial statements", "Assessable income", "Growth"], status: "published", indexable: true,
    sections: [
      { heading: "A good business can look complicated on paper", body: "Retained profits, depreciation, one-off expenses, director wages, distributions, company or trust structures and recent growth can make a sound operation difficult to fit into one standard formula." },
      { heading: "The accounts tell a story. The application has to translate it", body: "Different lenders can accept different forms and periods of evidence. The stronger approach begins with understanding the financials and the real operating story, not trying to hide complexity." },
      { heading: "Flexibility still needs a responsible outcome", body: "A different policy does not remove the need for sustainable repayments and sensible buffers. The aim is a fair assessment of the business—not a way around affordability." },
    ],
  },
  {
    slug: "cash-or-finance-equipment", title: "Pay cash for the equipment—or finance it? The answer is not always obvious.", audience: "BUSINESS OWNER BUILDING MORE", topic: "Assets",
    summary: "Cash avoids interest. Finance preserves cash. The better answer depends on what the asset and the retained capital can each produce.", service: "equipment-finance", tags: ["Assets", "Equipment finance", "Cash flow", "Working capital", "Business"], status: "published", indexable: true,
    sections: [
      { heading: "Compare opportunity cost, not just interest cost", body: "Paying cash can simplify the purchase. It also removes liquidity that may be needed for stock, wages, marketing, another asset or an unexpected delay." },
      { heading: "Match the term to the useful life", body: "Financing an asset long after its productive value has faded can strain later cash flow. A sensible structure recognises how long the equipment is expected to create value." },
      { heading: "Finance does not replace tax advice", body: "Ownership, deductions and treatment can differ by structure and circumstances. Coordinate lending strategy with advice from appropriately qualified tax and accounting professionals." },
    ],
  },
  {
    slug: "bigger-home-future-options", title: "A bigger home should not mean smaller future options.", audience: "AMBITIOUS UPGRADER", topic: "Upgrading",
    summary: "The right upgrade balances space today with resilience, flexibility and the goals that still matter after settlement.", service: "upgrading", tags: ["Upgrading", "Borrowing capacity", "Future plans", "Buffer", "Equity"], status: "published", indexable: true,
    sections: [
      { heading: "Borrowing capacity is not a recommendation", body: "A maximum approval does not know what you want to save, invest, build or change later. Decide what the household needs the new loan to leave possible." },
      { heading: "The current home creates choices", body: "Selling, retaining or bridging each changes debt, equity, cash flow and risk. Model the real costs and constraints before familiarity or fear makes the decision by default." },
      { heading: "Protect the move after the move", body: "A useful upgrade strategy considers buffers, income changes and later investments. More space can be a great outcome without making every future decision harder." },
    ],
  },
  {
    slug: "rate-hold-is-not-the-decision", title: "Rates are on hold. But that is not the interesting part.", audience: "HOMEOWNER REVIEWING WHAT COMES NEXT", topic: "Refinancing",
    summary: "A rate announcement is a headline. The useful question is what has changed in your position, loan and plans since the structure was put in place.", service: "refinancing", tags: ["Refinancing", "Interest rates", "Loan review", "Structure", "Next move"], status: "published", indexable: true,
    sections: [
      { heading: "A headline is not a household strategy", body: "A central-bank decision can hold everyone’s attention for a day. Your repayment structure, offset use, loan purpose, equity, fixed-rate timing and next goal can matter for much longer." },
      { heading: "The interesting part is what changed underneath", body: "Income may have moved. The property may have changed in value. An investment, renovation, upgrade or business decision may now be closer. A loan set up for the old position can quietly become the wrong shape for the next one." },
      { heading: "Review before reacting", body: "Do not refinance because a headline created urgency. Review the current rate, features, costs, remaining term, buffers and future use. Then decide whether the structure still earns its place." },
      { heading: "Attention is useful when it starts a better question", body: "The useful question is not simply whether rates moved. It is whether the current loan still supports what you are building next." },
    ],
  },
  {
    slug: "budget-contradictions-and-borrowing-capacity", title: "When a Budget headline and borrowing reality point in different directions", audience: "FIRST-HOME BUYER / INVESTOR", topic: "Buying",
    summary: "A policy announcement can sound supportive while the personal numbers still feel tight. The contradiction deserves current evidence before it becomes advice.", service: "home-loans", tags: ["Budget", "First home", "Investing", "Policy", "Borrowing capacity"], status: "draft", indexable: false,
    sourceNotes: "Adapted from the supplied campaign email. Before publication, verify every current Budget measure, date, threshold, eligibility rule and housing-policy claim against Treasury, the ATO and other primary government sources. Remove commentary that cannot be substantiated on publication day.",
    sections: [{ heading: "The contradiction", body: "Support can increase at the same time that serviceability, living costs or supply pressures make the decision feel harder. A useful article should explain both sides without turning a policy announcement into a promise." }],
  },
  {
    slug: "budget-rules-property-investors-verify-first", title: "The rules may have changed for property investors. Verify the detail before you act.", audience: "EMERGING PROPERTY BUILDER", topic: "Investing",
    summary: "Tax and policy changes can alter the comparison between structures, properties and timing. The current rules must be verified before this draft is published.", service: "investment-property-loans", tags: ["Budget", "Investing", "Tax", "Policy", "Structure"], status: "draft", indexable: false,
    sourceNotes: "Adapted from the supplied campaign email. Publication requires current primary sources and review by appropriately qualified tax or legal professionals where the article discusses tax treatment, deductions or ownership structures.",
    sections: [{ heading: "Start with the verified rule", body: "A strong point of view is useful only when the underlying measure, commencement date, eligibility and transition rules are current and sourced." }],
  },
];

for (const item of articles) {
  const publishAt = item.status === "published" ? "2026-08-13 00:00:00" : null;
  await connection.execute(
    `INSERT INTO pages (pageType, slug, title, eyebrow, excerpt, sections, status, publishAt, indexable, seoTitle, metaDescription, ctaKey)
     VALUES ('article', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE title=VALUES(title), eyebrow=VALUES(eyebrow), excerpt=VALUES(excerpt), sections=VALUES(sections), status=VALUES(status), publishAt=VALUES(publishAt), indexable=VALUES(indexable), seoTitle=VALUES(seoTitle), metaDescription=VALUES(metaDescription), ctaKey=VALUES(ctaKey)`,
    [item.slug, item.title, item.audience, item.summary, JSON.stringify(item.sections), item.status, publishAt, item.indexable, `${item.title} | Next Move Loans`, item.summary, `service:${item.service}`],
  );
  const [[page]] = await connection.query("SELECT id FROM pages WHERE slug=? LIMIT 1", [item.slug]);
  await connection.execute(
    `INSERT INTO articles (pageId, authorBrokerId, publicationDate, contentUpdatedDate, topic, tags, sourceNotes)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE authorBrokerId=VALUES(authorBrokerId), publicationDate=VALUES(publicationDate), contentUpdatedDate=VALUES(contentUpdatedDate), topic=VALUES(topic), tags=VALUES(tags), sourceNotes=VALUES(sourceNotes)`,
    [page.id, broker.id, publishAt, publishAt, item.topic, JSON.stringify(item.tags), item.sourceNotes ?? null],
  );
}

await connection.end();
console.log(`Seeded ${articles.filter(item => item.status === "published").length} published articles, ${articles.filter(item => item.status === "draft").length} verification-gated drafts and the reusable founder profile.`);
