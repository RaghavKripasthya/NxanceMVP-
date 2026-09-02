export type AssetClassStatus = "live" | "coming-soon";

export type AssetClassItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: AssetClassStatus;
  /** Mock flag — whether the user's current portfolio already includes this class */
  inPortfolio?: boolean;
};

/** Shared asset-class universe (Health Check Q6 + Portfolio Construction Q8) */
export const assetClassUniverse: AssetClassItem[] = [
  {
    id: "indian-equity",
    name: "Indian Equity (Direct Stocks)",
    category: "Equity",
    description: "Individual shares listed on NSE / BSE.",
    status: "live",
    inPortfolio: true,
  },
  {
    id: "equity-mf",
    name: "Equity Mutual Funds",
    category: "Equity",
    description: "Actively managed equity mutual funds.",
    status: "live",
    inPortfolio: true,
  },
  {
    id: "debt-mf",
    name: "Debt Mutual Funds",
    category: "Fixed Income",
    description: "Short, medium, and long-duration debt funds.",
    status: "live",
  },
  {
    id: "fixed-deposits",
    name: "Fixed Deposits",
    category: "Fixed Income",
    description: "Bank and corporate fixed deposits.",
    status: "live",
    inPortfolio: true,
  },
  {
    id: "gold",
    name: "Gold (ETF / SGB)",
    category: "Commodities",
    description: "Gold ETFs, sovereign gold bonds, and physical gold.",
    status: "live",
  },
  {
    id: "international-equity",
    name: "International Equity",
    category: "Equity",
    description: "US, global, and emerging-market equity exposure.",
    status: "live",
  },
  {
    id: "index-etf",
    name: "Index Funds & ETFs",
    category: "Equity",
    description: "Passive index trackers and exchange-traded funds.",
    status: "live",
  },
  {
    id: "gsec-bonds",
    name: "Government Bonds / G-Sec",
    category: "Fixed Income",
    description: "Sovereign and government-backed debt instruments.",
    status: "live",
  },
  {
    id: "corporate-bonds",
    name: "Corporate Bonds",
    category: "Fixed Income",
    description: "Investment-grade and high-yield corporate debt.",
    status: "live",
  },
  {
    id: "reits",
    name: "REITs",
    category: "Real Assets",
    description: "Real estate investment trusts for income and growth.",
    status: "coming-soon",
  },
  {
    id: "invits",
    name: "InvITs",
    category: "Real Assets",
    description: "Infrastructure investment trusts.",
    status: "coming-soon",
  },
  {
    id: "pms-aif",
    name: "PMS / AIF",
    category: "Alternatives",
    description: "Portfolio management services and alternative funds.",
    status: "coming-soon",
  },
  {
    id: "private-equity",
    name: "Private Equity",
    category: "Alternatives",
    description: "Pre-IPO and private market allocations.",
    status: "coming-soon",
  },
  {
    id: "crypto",
    name: "Digital Assets (Crypto)",
    category: "Alternatives",
    description: "Bitcoin, Ethereum, and regulated digital assets.",
    status: "coming-soon",
  },
  {
    id: "fractional-re",
    name: "Fractional Real Estate",
    category: "Real Assets",
    description: "Tokenised or fractional property ownership.",
    status: "coming-soon",
  },
  {
    id: "art-collectibles",
    name: "Art & Collectibles",
    category: "Alternatives",
    description: "Fine art, wine, and other collectible assets.",
    status: "coming-soon",
  },
];

/** Construction Q8 — simplified asset-class universe */
export const constructionAssetClassUniverse: AssetClassItem[] = [
  {
    id: "equity",
    name: "Equity",
    category: "Equity",
    description: "Direct stocks and equity exposure on Indian exchanges.",
    status: "live",
  },
  {
    id: "mutual-funds",
    name: "Mutual Funds",
    category: "Equity",
    description: "Actively and passively managed mutual fund schemes.",
    status: "live",
  },
  {
    id: "bonds",
    name: "Bonds",
    category: "Fixed Income",
    description: "Government, corporate, and other fixed-income instruments.",
    status: "live",
  },
  {
    id: "gold-etf",
    name: "Gold/ETF",
    category: "Commodities",
    description: "Gold ETFs, sovereign gold bonds, and commodity ETFs.",
    status: "live",
  },
  {
    id: "fixed-deposits",
    name: "Fixed Deposits",
    category: "Fixed Income",
    description: "Bank and corporate fixed deposits.",
    status: "live",
  },
  {
    id: "commodities",
    name: "Commodities",
    category: "Commodities",
    description: "Broader commodity exposure beyond gold.",
    status: "live",
  },
  {
    id: "currency",
    name: "Currency",
    category: "Alternatives",
    description: "Forex and currency-linked instruments.",
    status: "live",
  },
  {
    id: "reits",
    name: "REITs",
    category: "Real Assets",
    description: "Real estate investment trusts for income and growth.",
    status: "live",
  },
  {
    id: "international-equity",
    name: "International Equity",
    category: "Equity",
    description: "US, global, and emerging-market equity exposure.",
    status: "coming-soon",
  },
  {
    id: "crypto",
    name: "Crypto",
    category: "Alternatives",
    description: "Bitcoin, Ethereum, and regulated digital assets.",
    status: "coming-soon",
  },
  {
    id: "startups-pe",
    name: "Startups/Private Equity",
    category: "Alternatives",
    description: "Pre-IPO, startup, and private market allocations.",
    status: "coming-soon",
  },
  {
    id: "p2p-lending",
    name: "P2P Lending",
    category: "Alternatives",
    description: "Peer-to-peer and marketplace lending platforms.",
    status: "coming-soon",
  },
  {
    id: "fno",
    name: "F&O",
    category: "Alternatives",
    description: "Futures and options strategies.",
    status: "coming-soon",
  },
];

export const constructionDefaultLiveAssetIds = constructionAssetClassUniverse
  .filter((item) => item.status === "live")
  .map((item) => item.id);
