export type LocationSeoData = {
  slug: string;
  title: string;
  region: string;
  intro: string;
  localAngle: string;
  localContext: string[];
  priorityServices: string[];
  nearby: string[];
  physicalOffice: boolean;
  officeAddress?: string;
  evidenceNote: string;
  evidenceUrl: string;
  keywords: string[];
};

export const locationSeoPages: LocationSeoData[] = [
  {
    slug: "leongatha",
    title: "Leongatha",
    region: "South Gippsland",
    intro: "Looking for a mortgage broker in Leongatha? Next Move Loans is based at 19 Bair Street and helps clients with home loans, refinancing, investment, acreage, construction, business and asset finance.",
    localAngle: "Leongatha is South Gippsland’s largest town and sits at the centre of a broader rural and lifestyle-property market. That can mean finance questions ranging from standard residential lending to acreage, self-employed income, construction and business funding.",
    localContext: ["Buying or refinancing a home in Leongatha", "Residential-rural and acreage property finance", "Self-employed and business-owner lending", "Construction, investment and asset finance"],
    priorityServices: ["home-loans", "refinancing", "acreage-rural-finance", "self-employed-home-loans"],
    nearby: ["Korumburra", "Inverloch", "Wonthaggi", "Mirboo North", "Foster"],
    physicalOffice: true,
    officeAddress: "19 Bair Street, Leongatha VIC 3953",
    evidenceNote: "South Gippsland Shire identifies Leongatha as the most populous town in South Gippsland.",
    evidenceUrl: "https://www.southgippsland.vic.gov.au/info/20004/your_council/340/spotlight_on_leongatha",
    keywords: ["mortgage broker Leongatha", "home loans Leongatha", "refinance Leongatha", "acreage loans South Gippsland"],
  },
  {
    slug: "inverloch",
    title: "Inverloch",
    region: "Bass Coast / South Gippsland coast",
    intro: "Next Move Loans helps Inverloch buyers, homeowners and investors compare home loan, refinance, investment and construction options with a strategy built around the property and the next move.",
    localAngle: "Inverloch combines established homes, coastal lifestyle property, holiday-use considerations and new building activity. The useful finance question is often not just how much can be borrowed, but how the property, timing and intended use affect the lender choice.",
    localContext: ["Buying a home or coastal property in Inverloch", "Refinancing an existing Inverloch home loan", "Investment and holiday-property lending", "Construction, renovation and upgrade finance"],
    priorityServices: ["home-loans", "refinancing", "investment-property-loans", "construction-loans"],
    nearby: ["Wonthaggi", "Cape Paterson", "Leongatha", "Korumburra", "Venus Bay"],
    physicalOffice: false,
    evidenceNote: "Inverloch is a coastal township in the Bass Coast / South Gippsland market; this page is written for local search intent without claiming a physical office.",
    evidenceUrl: "https://www.basscoast.vic.gov.au/",
    keywords: ["mortgage broker Inverloch", "home loans Inverloch", "refinance Inverloch", "investment loans Inverloch"],
  },
  {
    slug: "warragul",
    title: "Warragul",
    region: "West Gippsland",
    intro: "Need a mortgage broker in Warragul? Next Move Loans works with home buyers, upgraders, investors and business owners across Warragul on home, construction, investment, self-employed and business finance.",
    localAngle: "Warragul is a major West Gippsland centre surrounded by productive agricultural land and has continued to grow as a residential and business hub. That creates a mix of established-home upgrades, new builds, investment, trade and business-owner lending needs.",
    localContext: ["Buying, building or upgrading in Warragul", "First-home and construction finance", "Investment property and equity strategy", "Self-employed, trade and business-owner lending"],
    priorityServices: ["upgrading", "construction-loans", "investment-property-loans", "self-employed-home-loans"],
    nearby: ["Drouin", "Yarragon", "Trafalgar", "Nilma", "Longwarry"],
    physicalOffice: false,
    evidenceNote: "Baw Baw Shire describes Warragul as a West Gippsland centre set amongst prime agricultural land and records a 2021 population of 19,856.",
    evidenceUrl: "https://www.bawbawshire.vic.gov.au/Plan-and-Build/Planning-for-our-Future-Growth/Warragul",
    keywords: ["mortgage broker Warragul", "home loans Warragul", "construction loans Warragul", "self employed mortgage broker Warragul"],
  },
  {
    slug: "drouin",
    title: "Drouin",
    region: "West Gippsland",
    intro: "Next Move Loans helps Drouin clients with first-home, upgrade, construction, refinance, investment and self-employed lending—without needing to know the exact product before the first conversation.",
    localAngle: "Drouin sits in West Gippsland between Melbourne and the broader Gippsland region, surrounded by agricultural land and planned for continued township growth. For borrowers, that commonly brings together new homes, construction, upgrades and business or trade income.",
    localContext: ["First-home and new-build finance in Drouin", "Upgrading as family and housing needs change", "Refinancing and accessing equity", "Self-employed and business-owner borrowing"],
    priorityServices: ["first-home-buyers", "construction-loans", "upgrading", "refinancing"],
    nearby: ["Warragul", "Longwarry", "Bunyip", "Yarragon", "Trafalgar"],
    physicalOffice: false,
    evidenceNote: "Baw Baw Shire describes Drouin as a growing West Gippsland township and has adopted a Township Plan to guide growth through 2036.",
    evidenceUrl: "https://www.bawbawshire.vic.gov.au/Plan-and-Build/Planning-for-our-Future-Growth/Drouin",
    keywords: ["mortgage broker Drouin", "home loans Drouin", "first home buyer Drouin", "construction loans Drouin"],
  },
  {
    slug: "pakenham",
    title: "Pakenham",
    region: "Melbourne South-East",
    intro: "Next Move Loans helps Pakenham home buyers, first-home buyers, upgraders, investors and business owners compare finance options across home, construction, investment and business lending.",
    localAngle: "Pakenham is one of Melbourne’s major south-east growth centres. For borrowers, that can mean first homes, house-and-land or construction finance, upgrading from an earlier purchase, and using growing equity for the next move.",
    localContext: ["First-home buyer finance in Pakenham", "House-and-land and construction loans", "Upgrading and bridging options", "Investment, equity and business-owner lending"],
    priorityServices: ["first-home-buyers", "construction-loans", "upgrading", "investment-property-loans"],
    nearby: ["Officer", "Beaconsfield", "Berwick", "Bunyip", "Clyde North"],
    physicalOffice: false,
    evidenceNote: "Cardinia Shire identifies Pakenham within Melbourne’s south-east growth corridor and plans extensively for residential growth and infrastructure.",
    evidenceUrl: "https://www.cardinia.vic.gov.au/",
    keywords: ["mortgage broker Pakenham", "home loans Pakenham", "first home buyer Pakenham", "construction loans Pakenham"],
  },
  {
    slug: "officer",
    title: "Officer",
    region: "Melbourne South-East",
    intro: "Next Move Loans helps Officer buyers and homeowners with first-home, construction, upgrade, refinance and investment lending across Melbourne’s south-east growth corridor.",
    localAngle: "Officer has developed rapidly as part of the Cardinia growth corridor, with newer estates and construction remaining important parts of the local housing mix. Finance strategy often needs to account for land, build contracts, timing and the move after the first purchase.",
    localContext: ["First-home buying in Officer", "Construction and house-and-land finance", "Refinancing after settlement or completion", "Upgrading and future investment planning"],
    priorityServices: ["first-home-buyers", "construction-loans", "refinancing", "upgrading"],
    nearby: ["Pakenham", "Beaconsfield", "Berwick", "Clyde North", "Cardinia"],
    physicalOffice: false,
    evidenceNote: "Officer forms part of Cardinia’s south-east metropolitan growth area, where planning has focused heavily on new residential development and infrastructure.",
    evidenceUrl: "https://www.cardinia.vic.gov.au/",
    keywords: ["mortgage broker Officer", "home loans Officer", "construction loans Officer", "first home buyer Officer"],
  },
  {
    slug: "beaconsfield",
    title: "Beaconsfield",
    region: "Melbourne South-East",
    intro: "Next Move Loans helps Beaconsfield homeowners, upgraders, investors and business owners work through home loan, refinance, investment and business-finance decisions.",
    localAngle: "Beaconsfield sits between established south-east suburbs and the newer Cardinia growth corridor. That can create a useful mix of established-home upgrades, equity, renovation, investment and business-owner lending conversations.",
    localContext: ["Upgrading or renovating in Beaconsfield", "Refinancing and equity release", "Investment property lending", "Self-employed and business-owner finance"],
    priorityServices: ["upgrading", "refinancing", "investment-property-loans", "self-employed-home-loans"],
    nearby: ["Berwick", "Officer", "Pakenham", "Beaconsfield Upper", "Narre Warren"],
    physicalOffice: false,
    evidenceNote: "Beaconsfield sits within the Cardinia / Casey south-east corridor; the page is built around established-home and growth-corridor finance intent.",
    evidenceUrl: "https://www.cardinia.vic.gov.au/",
    keywords: ["mortgage broker Beaconsfield", "home loans Beaconsfield", "refinance Beaconsfield", "investment loans Beaconsfield"],
  },
  {
    slug: "berwick",
    title: "Berwick",
    region: "Melbourne South-East",
    intro: "Next Move Loans helps Berwick homeowners, upgraders, investors and business owners with home loans, bridging, refinance, investment and self-employed finance.",
    localAngle: "Berwick combines an established village and mature housing areas with continued development on Melbourne’s south-east edge. That makes upgrading, buy-before-sell strategy, renovation, investment and business-owner lending especially relevant search themes.",
    localContext: ["Upgrading to the next Berwick home", "Buying before selling and bridging finance", "Refinancing or releasing equity", "Investment and self-employed lending"],
    priorityServices: ["upgrading", "bridging-finance", "refinancing", "investment-property-loans"],
    nearby: ["Beaconsfield", "Narre Warren", "Officer", "Pakenham", "Clyde North"],
    physicalOffice: false,
    evidenceNote: "City of Casey maintains a specific Berwick planning framework covering Berwick Village, established areas and continuing development.",
    evidenceUrl: "https://www.casey.vic.gov.au/berwick",
    keywords: ["mortgage broker Berwick", "home loans Berwick", "bridging finance Berwick", "refinance Berwick"],
  },
  {
    slug: "narre-warren",
    title: "Narre Warren",
    region: "Melbourne South-East",
    intro: "Next Move Loans helps Narre Warren buyers, homeowners, investors and business owners compare home, refinance, investment, self-employed and business-finance options.",
    localAngle: "Narre Warren is a major activity and service centre within the City of Casey and sits close to some of Melbourne’s fastest-growing residential areas. Finance needs can range from established-home refinancing and upgrades to investment and business-owner lending.",
    localContext: ["Home loans and refinancing in Narre Warren", "Upgrading within Melbourne’s south-east", "Investment property and equity lending", "Self-employed and business finance"],
    priorityServices: ["home-loans", "refinancing", "upgrading", "self-employed-home-loans"],
    nearby: ["Berwick", "Narre Warren North", "Narre Warren South", "Cranbourne", "Hallam"],
    physicalOffice: false,
    evidenceNote: "Narre Warren is within the City of Casey, one of Australia’s major growth municipalities, with extensive planning for housing, activity centres and infrastructure.",
    evidenceUrl: "https://www.casey.vic.gov.au/our-community-location",
    keywords: ["mortgage broker Narre Warren", "home loans Narre Warren", "refinance Narre Warren", "self employed mortgage broker Narre Warren"],
  },
];

export const getLocationSeoPage = (slug?: string) => locationSeoPages.find((location) => location.slug === slug);
