/**
 * Pathfinder Editorial content system: strategic before transactional, concise but specific,
 * and structured so every service, location, and article reinforces clarity and forward movement.
 */

export const assets = {
  favicon: "/manus-storage/favicon_96edf793.png",
  logo: "/manus-storage/nextmove-hori-480_bef5fab9.webp",
  logoReversed: "/manus-storage/nextmove-hori-reversed-480_985cc225.webp",
  verticalLogo: "/manus-storage/nextmove_vert_660d23e3.webp",
  icon: "/manus-storage/nextmove_Icon_coral_1f0abd9f.png",
  hero: "/manus-storage/next-move-hero-1440_c6181393.webp",
  heroSmall: "/manus-storage/next-move-hero-960_0a2da216.webp",
  heroMobile: "/manus-storage/next-move-hero-640_5c468f5b.webp",
  homeProperty: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=84",
  investmentProperty: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=84",
  businessCommercial: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=84",
  assetFinance: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1800&q=84",
  regionalAcreage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=84",
  pathMarker: "/manus-storage/next-move-path-marker_4361f082.png",
  framework: "/manus-storage/next-move-framework-1280_b898d303.webp",
  canvas: "/manus-storage/next-move-canvas-1280_f4ab59aa.webp",
} as const;

export type ServiceCategoryId = "home-property" | "investment" | "business-commercial" | "asset";

export type ServicePageData = {
  slug: string;
  title: string;
  category: ServiceCategoryId;
  eyebrow: string;
  short: string;
  challenge: string;
  intro: string;
  fit: string[];
  decisions: string[];
  faq: Array<{ question: string; answer: string }>;
  cta: string;
};

const commonFaq = (title: string): ServicePageData["faq"] => [
  {
    question: `When should I talk to a broker about ${title.toLowerCase()}?`,
    answer:
      "Earlier than most people think. A useful first conversation can expose policy issues, trade-offs, timing constraints and options before you make a commitment.",
  },
  {
    question: "Will you only look at one bank?",
    answer:
      "No. The role is to understand the strategy first, then assess suitable options across the available lender panel. The final recommendation still depends on your verified circumstances and lender policy.",
  },
  {
    question: "Does this page replace personal lending advice?",
    answer:
      "No. It is general information. Lending options, costs and risks should be assessed against your objectives, financial position and the property or asset involved.",
  },
];

const makeService = (
  slug: string,
  title: string,
  category: ServiceCategoryId,
  eyebrow: string,
  short: string,
  challenge: string,
  intro: string,
  fit: string[],
  decisions: string[],
  cta: string,
  faq?: ServicePageData["faq"],
): ServicePageData => ({
  slug,
  title,
  category,
  eyebrow,
  short,
  challenge,
  intro,
  fit,
  decisions,
  faq: faq ?? commonFaq(title),
  cta,
});

export const services: ServicePageData[] = [
  makeService(
    "home-loans",
    "Home Loans",
    "home-property",
    "HOME & PROPERTY",
    "Finance that fits the home—and what you want life to look like around it.",
    "A home loan is a thirty-year product attached to a much bigger life decision.",
    "We look beyond the advertised rate to the flexibility, structure, policy fit and future options created by the loan.",
    ["Buying an established home", "Moving from one lender to another", "Planning for future upgrades or investments"],
    ["How much flexibility will you need later?", "Which features are useful rather than decorative?", "What could change your borrowing position next?"],
    "Talk Through the Right Home Loan",
  ),
  makeService(
    "refinancing",
    "Refinancing",
    "home-property",
    "RESET THE STRUCTURE",
    "A lower rate can help. A better structure can do more.",
    "Refinancing because a headline rate looks smaller is not the same as improving your position.",
    "We test the whole move: costs, loan term, cash flow, features, equity access and whether the new structure creates more room for what comes next.",
    ["Reviewing a loan that has drifted", "Consolidating debt thoughtfully", "Unlocking equity for a defined purpose"],
    ["What does the switch cost in real terms?", "Will extending the loan term erase the benefit?", "What opportunity should the new structure unlock?"],
    "Talk Through Your Borrowing Position",
  ),
  makeService(
    "first-home-buyers",
    "First Home Buyer Loans",
    "home-property",
    "FIRST HOME, CLEARER PLAN",
    "You do not need every answer before you begin. You do need the right questions.",
    "Buying a first home involves more than finding a deposit and a pre-approval.",
    "We help you understand your realistic range, upfront costs, available support, loan trade-offs and the sequence from idea to settlement.",
    ["Testing whether now is realistic", "Comparing deposit pathways", "Preparing to make an offer with confidence"],
    ["What can you afford without shrinking everything else?", "Which costs sit outside the purchase price?", "What changes if the property is new, established or regional?"],
    "Plan Your First Move",
  ),
  makeService(
    "upgrading",
    "Upgrade Finance",
    "home-property",
    "MORE SPACE, MORE OPTIONS",
    "A bigger home should not mean smaller future options.",
    "Upgrading creates a chain of connected decisions: keep or sell, buy first or sell first, use equity or preserve it, stretch now or retain capacity.",
    "We model the sequence and trade-offs before the property search gets ahead of the finance strategy.",
    ["Outgrowing the current home", "Considering whether to retain the existing property", "Moving from Melbourne to regional Victoria"],
    ["Buy before selling or sell first?", "How much buffer protects the plan?", "What does the move leave available for later?"],
    "Plan the Upgrade",
  ),
  makeService(
    "construction-loans",
    "Construction Loans",
    "home-property",
    "BUILD WITH THE FINANCE IN STEP",
    "The floor plan is only one plan that needs to work.",
    "Construction lending introduces progress payments, valuation points, contracts, variations, site costs and timing dependencies.",
    "We align the finance structure with the build so each stage has a clear funding path and fewer avoidable surprises.",
    ["House-and-land packages", "Custom builds", "Major renovations, extensions or knockdown-rebuilds"],
    ["What is included—and excluded—from the contract?", "How will variations and site costs be covered?", "What buffer remains when the build begins?"],
    "Check the Build & Finance Fit",
  ),
  makeService(
    "bridging-finance",
    "Bridging Finance",
    "home-property",
    "MOVE BEFORE THE SALE",
    "Keeping the old home is not automatically a strategy. Selling it first is not one either.",
    "Bridging finance can create timing flexibility, but only when the peak debt, sale assumptions, costs and exit plan are understood.",
    "We compare the possible sequences and help you see the pressure points before you commit to the next property.",
    ["Buying before the existing home sells", "Downsizing or relocating", "Managing a short settlement gap"],
    ["What happens if the sale takes longer?", "What is the peak debt exposure?", "Is bridging the best path—or simply the obvious one?"],
    "Talk Through Buying Before Selling",
  ),
  makeService(
    "acreage-rural-finance",
    "Residential-Rural & Acreage Finance",
    "home-property",
    "CHECK THE PROPERTY FIT",
    "Falling in love with the property before checking the security can be an expensive order of events.",
    "Acreage and regional properties can be assessed differently depending on land size, zoning, access, improvements, services and intended use.",
    "We investigate the property and lender fit early, then shape the finance around the real characteristics of the purchase.",
    ["Residential acreage", "Lifestyle and hobby-farm properties", "Regional homes with unusual features or mixed use"],
    ["How will lenders classify the security?", "Do sheds, land use or access change the options?", "Does the loan still fit if the valuation is conservative?"],
    "Check the Property & Finance Fit",
  ),
  makeService(
    "investment-property-loans",
    "Investment Property Loans",
    "investment",
    "INVEST WITH THE NEXT MOVE IN VIEW",
    "The property may be the purchase. The portfolio is the plan.",
    "A suitable investment loan balances cash flow, flexibility, lender policy, ownership structure and the borrowing capacity needed for the move after this one.",
    "We consider the current acquisition without losing sight of the portfolio you are trying to build.",
    ["Buying a first investment", "Adding to an existing portfolio", "Reviewing investment debt structure"],
    ["How does this lender treat future borrowing?", "What buffer survives a rate or vacancy shock?", "Which structure keeps choices open?"],
    "Build the Investment Game Plan",
  ),
  makeService(
    "equity",
    "Equity & Equity Release",
    "investment",
    "EQUITY IS CAPACITY, NOT FREE MONEY",
    "Equity can unlock an opportunity. It can also disguise a weak plan.",
    "We help define the purpose, cost, structure and risk of accessing property equity before it becomes another undirected loan split.",
    "The aim is to connect the additional borrowing to a defined outcome while keeping the repayment path and future flexibility visible.",
    ["Funding a deposit", "Renovating or improving a property", "Supporting a business or major purchase"],
    ["What is the equity being used to create?", "How will the additional debt be repaid?", "Should the funds be separated for clarity and record keeping?"],
    "Talk Through the Equity Strategy",
  ),
  makeService(
    "portfolio-lending",
    "Portfolio Lending",
    "investment",
    "DO NOT LET ONE LOAN BOX IN THE NEXT",
    "Have you reached your borrowing limit—or just your lender’s limit?",
    "As a portfolio grows, lender choice, debt concentration, valuations, cross-collateralisation and policy sequencing become increasingly important.",
    "We map the existing structure and identify which move improves flexibility rather than merely completing the next transaction.",
    ["Multiple investment properties", "Approaching a serviceability ceiling", "Untangling cross-collateralised debt"],
    ["Which lender should be used now—and saved for later?", "Where is debt concentration creating risk?", "What would a cleaner structure change?"],
    "Review the Portfolio Structure",
  ),
  makeService(
    "smsf-property-lending",
    "SMSF Property Lending",
    "investment",
    "PROPERTY INSIDE SUPER NEEDS A WIDER PLAN",
    "A loan inside an SMSF is a specialist structure, not a shortcut to property investing.",
    "The lending, property, trust structure, liquidity and advice sequence all need to align before a contract is signed.",
    "We coordinate the lending component with the appropriately qualified legal, accounting and financial-advice professionals involved in the strategy.",
    ["Considering residential or commercial property in an SMSF", "Comparing specialist lenders", "Coordinating the lending and advice sequence"],
    ["Is the fund structure established correctly?", "How will liquidity and ongoing costs be managed?", "Does the property meet lender and regulatory constraints?"],
    "Talk Through the SMSF Lending Path",
  ),
  makeService(
    "self-employed-home-loans",
    "Self-Employed Home Loans",
    "business-commercial",
    "SEE THE BUSINESS, NOT ONE NUMBER",
    "Your business should not be reduced to one number on a tax return.",
    "Self-employed income can be strong and still look complicated through a standard lending lens.",
    "We understand the business story, documentation, ownership structure and lender policy differences before deciding how best to present the application.",
    ["Directors and business owners", "Irregular or changing income", "Complex company, trust or partnership structures"],
    ["Which income evidence tells the true story?", "Are add-backs or one-off costs relevant?", "Which lender policy fits the business rather than fighting it?"],
    "Talk Through Your Borrowing Position",
  ),
  makeService(
    "business-finance",
    "Business Finance",
    "business-commercial",
    "FUND THE MOVE, NOT THE VAGUE IDEA",
    "Capital only helps when it is connected to a clear business outcome.",
    "Business finance can support acquisition, expansion, fit-out, stock, systems or a strategic transition—but the facility must match the use and cash flow.",
    "We help define the purpose, timing and repayment logic before approaching suitable lenders.",
    ["Growth or acquisition", "Premises and fit-out", "Restructuring existing business debt"],
    ["What measurable outcome should the facility create?", "Is the term aligned with the use of funds?", "How much headroom should remain after drawdown?"],
    "Build the Business Finance Plan",
  ),
  makeService(
    "commercial-property-finance",
    "Commercial Property Finance",
    "business-commercial",
    "THE PROPERTY AND THE BUSINESS BOTH MATTER",
    "A commercial property decision should strengthen the operation—not simply move rent into debt.",
    "Commercial lending assessment can depend on the property, tenant, lease, business performance, deposit, valuation and proposed ownership structure.",
    "We coordinate these moving parts and identify the lending path most consistent with the wider business strategy.",
    ["Owner-occupied premises", "Commercial investment property", "Refinancing or improving an existing commercial facility"],
    ["How specialised is the security?", "What does the business cash flow comfortably support?", "Which ownership and lending structure is being proposed?"],
    "Check the Commercial Property Fit",
  ),
  makeService(
    "working-capital",
    "Working Capital",
    "business-commercial",
    "BREATHING ROOM NEEDS A PURPOSE",
    "Working capital should create momentum, not postpone a structural problem.",
    "A suitable facility can help smooth timing gaps, fund growth or manage seasonal needs when the limit, term and repayment structure fit the operating cycle.",
    "We clarify the cash-flow gap and compare options rather than defaulting to the easiest available debt.",
    ["Seasonal businesses", "Growth that creates a temporary cash gap", "Replacing an unsuitable short-term facility"],
    ["Is the need temporary or recurring?", "What event or cash inflow repays the facility?", "Would asset or invoice-linked finance fit better?"],
    "Talk Through the Cash-Flow Gap",
  ),
  makeService(
    "asset-finance",
    "Asset Finance",
    "asset",
    "PUT THE ASSET TO WORK",
    "The cheapest-looking facility is not always the one that best supports the business.",
    "Asset finance should account for cash flow, tax and accounting advice, deposit, useful life, ownership, balloon or residual exposure and the opportunity cost of paying cash.",
    "We compare structures with the asset’s job and the wider business plan in view.",
    ["Business vehicles", "Equipment and technology", "Machinery and productive assets"],
    ["How long will the asset generate value?", "What cash should remain in the business?", "Which repayment profile matches the operating cycle?"],
    "Finance Your Next Asset",
  ),
  makeService(
    "vehicle-finance",
    "Vehicle Finance",
    "asset",
    "KEEP THE VEHICLE DECISION IN GEAR",
    "Price, repayment and tax treatment are different questions.",
    "Whether the vehicle is for work, family or fleet use, the right structure depends on purpose, ownership, cash flow and the broader borrowing plan.",
    "We coordinate the finance decision without letting dealership urgency set the strategy.",
    ["Business and trade vehicles", "Fleet additions", "Personal vehicles linked to a wider finance review"],
    ["Who should own the vehicle?", "How does the term compare with expected use?", "What flexibility matters if the vehicle changes early?"],
    "Finance Your Next Vehicle",
  ),
  makeService(
    "equipment-finance",
    "Equipment Finance",
    "asset",
    "EQUIPMENT SHOULD CREATE CAPACITY",
    "If the asset will not improve output, margin or reliability, finance will not fix the decision.",
    "We assess the equipment purpose, useful life, cash-flow impact and suitable facility structure before the purchase locks in the commitment.",
    "The finance should support the value the equipment is expected to create without consuming the working capital needed to operate it.",
    ["Professional and medical equipment", "Technology and fit-out", "Production and trade equipment"],
    ["What capacity does the equipment add?", "How quickly does it become obsolete?", "Should cash be preserved for another business need?"],
    "Finance the Equipment Plan",
  ),
  makeService(
    "machinery-finance",
    "Machinery Finance",
    "asset",
    "MATCH THE REPAYMENT TO THE WORK",
    "A machine earns in operating cycles. The finance should respect them.",
    "Machinery finance may need to account for seasonal cash flow, dealer timing, asset age, valuation, deposit and the income the asset is expected to generate.",
    "We help line up the purchase, structure and repayment profile with the real operation.",
    ["Agricultural machinery", "Civil and construction equipment", "Manufacturing and workshop machinery"],
    ["Is the asset new, used or specialised?", "Does seasonality call for a tailored repayment pattern?", "What value or productivity will the machine create?"],
    "Finance Your Next Machine",
  ),
];

export const serviceCategories = [
  {
    id: "home-property" as const,
    title: "Home & Property",
    eyebrow: "LIVE / MOVE / BUILD",
    description:
      "From a first home to acreage, construction or the move before the sale—the property matters, but so does what it unlocks.",
    challenge: "The loan is one part of the move.",
    image: assets.homeProperty,
    path: "/finance/home-property",
  },
  {
    id: "investment" as const,
    title: "Investment",
    eyebrow: "EQUITY / PORTFOLIO / WEALTH",
    description:
      "Structure today’s acquisition so it supports the portfolio, flexibility and opportunities you want tomorrow.",
    challenge: "Buy the property. Protect the next move.",
    image: assets.investmentProperty,
    path: "/finance/investment",
  },
  {
    id: "business-commercial" as const,
    title: "Business & Commercial",
    eyebrow: "GROW / ACQUIRE / OPERATE",
    description:
      "Finance that sees the whole business story—from self-employed home lending to premises, working capital and growth.",
    challenge: "Your business is more than a tax return.",
    image: assets.businessCommercial,
    path: "/finance/business-commercial",
  },
  {
    id: "asset" as const,
    title: "Asset Finance",
    eyebrow: "VEHICLE / EQUIPMENT / MACHINERY",
    description:
      "Put the asset to work without losing sight of cash flow, useful life and the next investment the business may need to make.",
    challenge: "Pay cash or finance it? The answer is rarely automatic.",
    image: assets.assetFinance,
    path: "/finance/asset",
  },
];

export const solutionHubs = [
  {
    id: "purchase",
    title: "Purchase",
    path: "/solutions/purchase",
    short: "First home, next home, renovation, construction or buying before you sell.",
    prompt: "What are you trying to buy or build?",
  },
  {
    id: "refinance",
    title: "Refinance",
    path: "/solutions/refinance",
    short: "Restructure debt, consolidate, release equity or reset the loan around what comes next.",
    prompt: "What should the new structure improve?",
  },
  {
    id: "investment",
    title: "Investment",
    path: "/solutions/investment",
    short: "Buy the first or next property while protecting capacity for the move after it.",
    prompt: "Is the constraint the deposit, capacity or structure?",
  },
  {
    id: "business",
    title: "Business",
    path: "/solutions/business",
    short: "Fund growth, working capital, a business purchase or commercial premises.",
    prompt: "What should the finance help the business create?",
  },
  {
    id: "agri-rural",
    title: "Agri & Rural",
    path: "/solutions/agri-rural",
    short: "Acreage, lifestyle property, regional construction, machinery and rural opportunities.",
    prompt: "Will the lender understand the property and the operation?",
  },
  {
    id: "asset",
    title: "Asset",
    path: "/solutions/asset",
    short: "Vehicle, equipment and machinery finance aligned with cash flow and useful life.",
    prompt: "What value should the asset put to work?",
  },
] as const;

export const contactDetails = {
  landlineDisplay: "03 5639 9204",
  landlineHref: "tel:+61356399204",
  mobileDisplay: "0417 690 985",
  mobileHref: "tel:+61417690985",
  email: "unlock@nextmoveloans.com.au",
  emailHref: "mailto:unlock@nextmoveloans.com.au",
  address: "19 Bair Street, Leongatha VIC 3953",
  discoveryCall: "https://calendly.com/martin-reidy/discovery-call",
  gamePlan: "https://calendly.com/martin-reidy/strategysession",
} as const;

export const approvalSteps = [
  {
    number: "01",
    title: "Create Clarity",
    short: "Understand where you are, where you want to go and what may be standing in the way.",
    question: "What are you really trying to build?",
  },
  {
    number: "02",
    title: "Build the Game Plan",
    short: "Shape the current move while keeping the opportunities that may follow in view.",
    question: "Which path creates the strongest next position?",
  },
  {
    number: "03",
    title: "Take Action",
    short: "Coordinate the lending strategy, lender and relevant specialists, then move the plan forward.",
    question: "What needs to happen—and in what order?",
  },
  {
    number: "04",
    title: "The Partner",
    short: "Review the strategy as life, markets and opportunities change.",
    question: "What is the next move after this one?",
  },
];

export type LocationPageData = {
  slug: string;
  title: string;
  region: string;
  eyebrow: string;
  intro: string;
  localContext: string[];
  priorityServices: string[];
  nearby: string[];
  physicalOffice: boolean;
  officeAddress?: string;
  evidenceNote: string;
  evidenceUrl: string;
};

export const locations: LocationPageData[] = [
  {
    slug: "leongatha",
    title: "Leongatha",
    region: "Confirmed office · Gippsland",
    eyebrow: "A LOCAL OFFICE. A BROADER FINANCE VIEW.",
    intro:
      "Next Move Loans is based at 19 Bair Street, Leongatha. From here, the team helps clients connect home, acreage, investment, self-employed, business and asset-finance decisions rather than treating each loan as an isolated transaction.",
    localContext: [
      "A confirmed local office for in-person conversations by arrangement",
      "Homes, acreage and lifestyle properties with different security questions",
      "Trades, farming, contracting and business income that may need a clearer evidence story",
      "Connected property, vehicle, machinery and commercial-finance decisions",
    ],
    priorityServices: ["acreage-rural-finance", "self-employed-home-loans", "construction-loans", "business-finance"],
    nearby: ["Korumburra", "Inverloch", "Wonthaggi", "Mirboo North", "Foster", "Yarragon"],
    physicalOffice: true,
    officeAddress: "19 Bair Street, Leongatha VIC 3953",
    evidenceNote: "South Gippsland Shire Council identifies Leongatha as the largest town in its published town comparison and links current community, economic and housing profiles.",
    evidenceUrl: "https://www.southgippsland.vic.gov.au/homepage/125/shire_and_community_statistics",
  },
  {
    slug: "warragul",
    title: "Warragul",
    region: "Service area · West Gippsland",
    eyebrow: "GROWTH NEEDS A FINANCE SEQUENCE.",
    intro:
      "Next Move Loans serves Warragul clients by phone, video and appointment. Household moves, construction, trades and established or growing businesses can create connected lending decisions that deserve one clear plan.",
    localContext: ["Buying, building or upgrading with the sale and buffer modelled first", "Self-employed, trade and business-owner income", "Commercial premises, working capital, vehicles and equipment", "A service-area relationship without claiming a Warragul office"],
    priorityServices: ["construction-loans", "upgrading", "self-employed-home-loans", "equipment-finance"],
    nearby: ["Drouin", "Trafalgar", "Yarragon", "Nilma", "Bunyip", "Longwarry"],
    physicalOffice: false,
    evidenceNote: "Baw Baw Shire Council maintains economic and community profiles designed to describe the area’s role in the broader economy and explore local strengths.",
    evidenceUrl: "https://www.bawbawshire.vic.gov.au/Your-Business/Economic-Profile",
  },
  {
    slug: "berwick",
    title: "Berwick",
    region: "Service area · Melbourne South-East",
    eyebrow: "WHERE THE BUSINESS BEGAN.",
    intro:
      "Martin Reidy began his broking business in Berwick. Next Move Loans continues to serve households, investors and business owners across the area without implying a current physical office.",
    localContext: ["Established-home upgrades, bridging and renovation", "First-home and construction pathways in surrounding growth areas", "Investment capacity, equity and lender-sequence decisions", "Self-employed and business-owner finance across property, commercial and asset needs"],
    priorityServices: ["upgrading", "bridging-finance", "investment-property-loans", "business-finance"],
    nearby: ["Beaconsfield", "Narre Warren", "Pakenham", "Officer", "Clyde", "Cranbourne"],
    physicalOffice: false,
    evidenceNote: "The Australian Bureau of Statistics recognises Berwick as a 2021 Census Suburb and Locality and publishes community and working-population profiles for that geography.",
    evidenceUrl: "https://abs.gov.au/census/find-census-data/community-profiles/2021/SAL20224",
  },
];

export type ArticleData = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  relatedService: string;
  sections: Array<{ heading: string; body: string }>;
  audience?: string;
  decision?: string;
  tags?: string[];
  readMinutes?: number;
  publishedAt?: string;
  updatedAt?: string;
  sourceNote?: string;
};

export const articles: ArticleData[] = [
  {
    slug: "borrowing-limit-or-lenders-limit",
    title: "Have you reached your borrowing limit—or just your lender’s limit?",
    category: "Investment & Strategy",
    summary: "Serviceability is not one universal number. Policy, sequencing and structure can change the answer—and the risks.",
    relatedService: "portfolio-lending",
    sections: [
      {
        heading: "One calculation is not the whole market",
        body: "Lenders may treat income, existing debt, rental income, expenses and loan terms differently. A decline or lower figure can describe one policy outcome, not every possible pathway.",
      },
      {
        heading: "More borrowing is not automatically the right answer",
        body: "The real question is whether additional debt still fits your cash flow, buffers, goals and tolerance for change. Strategy is not a search for the largest number; it is a search for the strongest next position.",
      },
      {
        heading: "Sequence matters",
        body: "Which lender is used now, how existing loans are structured and where security is held can affect future flexibility. Review the portfolio before the next application turns a temporary decision into a long-term constraint.",
      },
    ],
  },
  {
    slug: "sell-before-you-buy",
    title: "Should you sell your home before buying the next one?",
    category: "Home & Property",
    summary: "There is no universal order. The right sequence depends on timing, buffers, sale risk, borrowing capacity and how specific the next property needs to be.",
    relatedService: "bridging-finance",
    sections: [
      {
        heading: "Selling first creates certainty—and a different risk",
        body: "A completed sale can clarify available funds and remove the pressure of carrying two properties. It may also create temporary accommodation, a rushed purchase or a narrower window to find the right home.",
      },
      {
        heading: "Buying first creates flexibility—and peak debt",
        body: "Bridging or other buy-first structures can make a move possible before the sale, but the peak exposure, interest, valuation, time assumptions and exit path need to be understood.",
      },
      {
        heading: "Model the sequence before choosing it",
        body: "Compare realistic sale outcomes, buffers and timeframes. The best answer is the one that manages both the financial pressure and the practical move—not the one that sounds simplest in a headline.",
      },
    ],
  },
  {
    slug: "buying-acreage-check-first",
    title: "Buying acreage? Check this before falling in love with the property.",
    category: "Regional & Rural",
    summary: "Land size, zoning, access, improvements and intended use can influence how a lender sees the security.",
    relatedService: "acreage-rural-finance",
    sections: [
      {
        heading: "Residential address does not always mean standard security",
        body: "A property can look like a home to the buyer and still trigger different lender treatment because of land size, location, access, services, sheds, income-producing use or unusual improvements.",
      },
      {
        heading: "Ask property questions before finance becomes urgent",
        body: "A contract deadline is a poor moment to discover a valuation concern or policy restriction. Share the address, listing, intended use and relevant property details early enough to investigate.",
      },
      {
        heading: "Keep the lifestyle and the structure connected",
        body: "The right move should fit both the property you want and the financial position you want to retain afterward. Deposit, buffer, renovation needs and future business or investment goals all belong in the same conversation.",
      },
    ],
  },
  {
    slug: "profitable-business-bank-says-no",
    title: "Your business is profitable. So why does the bank say you can’t borrow?",
    category: "Self-Employed",
    summary: "Business performance, taxable income and assessable lending income are connected—but they are not identical.",
    relatedService: "self-employed-home-loans",
    sections: [
      {
        heading: "The business story may not fit one standard formula",
        body: "Retained profits, depreciation, one-off expenses, director wages, distributions, company or trust structures and recent growth can make a strong operation appear more complicated on paper.",
      },
      {
        heading: "Documentation changes the conversation",
        body: "Different lenders may accept different forms and time periods of evidence. The right approach starts with understanding the accounts and the real operating story, not hiding complexity.",
      },
      {
        heading: "Policy fit still has to support a responsible outcome",
        body: "A more flexible lender does not remove the need for sustainable repayments and sensible buffers. The aim is a fair, accurate assessment of the business—not a way around affordability.",
      },
    ],
  },
  {
    slug: "cash-or-finance-equipment",
    title: "Pay cash for the equipment—or finance it? The answer isn’t always obvious.",
    category: "Asset Finance",
    summary: "Cash avoids interest. Finance preserves cash. The better answer depends on what the asset and the retained capital can each produce.",
    relatedService: "equipment-finance",
    sections: [
      {
        heading: "Compare opportunity cost, not just interest cost",
        body: "Paying cash can simplify the purchase, but it also removes liquidity that may be needed for stock, wages, marketing, another asset or an unexpected delay.",
      },
      {
        heading: "Match the term to the useful life",
        body: "Financing an asset long after its productive value has faded can strain future cash flow. A sensible structure recognises how long the equipment is expected to create value.",
      },
      {
        heading: "Bring accounting and tax advice into the plan",
        body: "Ownership, deductions and treatment can differ by structure and circumstances. Lending strategy should be coordinated with advice from appropriately qualified tax and accounting professionals.",
      },
    ],
  },
  {
    slug: "bigger-home-future-options",
    title: "A bigger home shouldn’t mean smaller future options.",
    category: "Upgrading",
    summary: "The right upgrade balances space today with resilience, flexibility and the goals that still matter after settlement.",
    relatedService: "upgrading",
    sections: [
      {
        heading: "Borrowing capacity is not a recommendation",
        body: "A maximum approval does not know what you want to save, invest, build or change later. Decide what the household needs the loan to leave possible.",
      },
      {
        heading: "The existing home creates choices",
        body: "Selling, retaining or bridging each changes debt, equity, cash flow and risk. Model the real costs and constraints before familiarity or fear makes the decision by default.",
      },
      {
        heading: "Protect the move after the move",
        body: "A useful upgrade strategy considers buffers, future income changes and planned investments. More space can be a great outcome without making every future decision harder.",
      },
    ],
  },
];

export const founder = {
  name: "Martin ‘Marty’ Reidy",
  role: "Founder & Mortgage Broker",
  intro:
    "Marty started his broking business in Berwick before moving to Leongatha to reconnect with his country roots and create a full-service finance business built around real choice. Better advice changed the level of his own game; Next Move Loans exists to help other people move beyond uncertainty and build the life or business they want.",
  credentials: [
    "Diploma of Finance and Mortgage Broking Management",
    "Master of Business Administration",
    "Bachelor of Business",
    "Mortgage broker since 2020",
  ],
  strengths: ["Upgrading and buy-before-sell strategy", "Investment capacity and equity", "Business-owner and complex-income lending", "Regional, acreage, commercial and asset finance"],
  publicProfile: "https://brokerpages.com.au/mortgage-broker/martin-reidy-1/",
};

export const navGroups = [
  {
    label: "Solutions",
    links: solutionHubs.map(solution => [solution.title, solution.path]),
  },
  {
    label: "Loan Types",
    links: [
      ["All Loan Types", "/loan-types"],
      ["Home Loans", "/services/home-loans"],
      ["Refinancing", "/services/refinancing"],
      ["Bridging Finance", "/services/bridging-finance"],
      ["Construction Loans", "/services/construction-loans"],
      ["Investment Loans", "/services/investment-property-loans"],
      ["Business Finance", "/services/business-finance"],
      ["Commercial Property", "/services/commercial-property-finance"],
      ["Asset Finance", "/services/asset-finance"],
    ],
  },
  {
    label: "Why Next Move",
    links: [
      ["The Approval Method™", "/approval-method"],
      ["Our Why", "/about"],
      ["Meet Marty", "/team/martin-reidy"],
      ["Awards & Reviews", "/reviews"],
    ],
  },
] as const;

export const siteUrl = "https://nextmoveloans.com.au";

export const getService = (slug?: string) => services.find((service) => service.slug === slug);
export const getCategory = (id?: string) => serviceCategories.find((category) => category.id === id);
export const getLocation = (slug?: string) => locations.find((location) => location.slug === slug);
export const getArticle = (slug?: string) => articles.find((article) => article.slug === slug);
