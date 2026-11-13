// ---------------------------------------------------------------------------
// SAMPLE DATA ONLY
//
// Every number, SKU code, price and status below is invented for demonstration
// purposes. None of it comes from any employer, marketplace account or client.
// It exists so the dashboards on this site have something to render; it is not
// a record of real sales, inventory, pricing or campaign performance.
// ---------------------------------------------------------------------------

export const SAMPLE_NOTICE =
  "Sample data. Figures are illustrative and do not represent any employer, client or marketplace account.";

export const channels = ["Amazon", "Flipkart", "Myntra", "Shopify"];

export const channelColors = {
  Amazon: "#2563eb",
  Flipkart: "#60a5fa",
  Myntra: "#1b3a6b",
  Shopify: "#93c5fd",
};

export const categories = ["Back Cover", "Tempered Glass", "Gift Box Bundle"];

// --- Sales MIS -------------------------------------------------------------

export const channelSales = [
  { channel: "Amazon", units30: 1840, units90: 5120, orders30: 1602, listings: 412 },
  { channel: "Flipkart", units30: 1375, units90: 4080, orders30: 1218, listings: 386 },
  { channel: "Myntra", units30: 640, units90: 1910, orders30: 589, listings: 174 },
  { channel: "Shopify", units30: 410, units90: 1265, orders30: 362, listings: 128 },
];

export const salesTrend = [
  { week: "W1", Amazon: 392, Flipkart: 301, Myntra: 142, Shopify: 86 },
  { week: "W2", Amazon: 418, Flipkart: 288, Myntra: 151, Shopify: 94 },
  { week: "W3", Amazon: 376, Flipkart: 324, Myntra: 138, Shopify: 101 },
  { week: "W4", Amazon: 441, Flipkart: 312, Myntra: 160, Shopify: 88 },
  { week: "W5", Amazon: 465, Flipkart: 347, Myntra: 171, Shopify: 112 },
  { week: "W6", Amazon: 428, Flipkart: 335, Myntra: 149, Shopify: 97 },
  { week: "W7", Amazon: 487, Flipkart: 358, Myntra: 183, Shopify: 118 },
  { week: "W8", Amazon: 452, Flipkart: 341, Myntra: 165, Shopify: 104 },
  { week: "W9", Amazon: 510, Flipkart: 372, Myntra: 192, Shopify: 126 },
  { week: "W10", Amazon: 473, Flipkart: 356, Myntra: 174, Shopify: 109 },
  { week: "W11", Amazon: 528, Flipkart: 389, Myntra: 201, Shopify: 131 },
  { week: "W12", Amazon: 496, Flipkart: 367, Myntra: 186, Shopify: 115 },
];

export const skuPerformance = [
  {
    sku: "BC-RL13P-MT",
    product: "Matte Back Cover — Model A13 Pro",
    channel: "Amazon",
    category: "Back Cover",
    units30: 318,
    units90: 842,
    available: 240,
    sellPrice: 299,
    status: "Live",
  },
  {
    sku: "TG-RL13P-9H",
    product: "9H Tempered Glass — Model A13 Pro",
    channel: "Amazon",
    category: "Tempered Glass",
    units30: 402,
    units90: 1164,
    available: 118,
    sellPrice: 199,
    status: "Live",
  },
  {
    sku: "BC-SG24-CLR",
    product: "Clear Back Cover — Model S24",
    channel: "Flipkart",
    category: "Back Cover",
    units30: 276,
    units90: 791,
    available: 62,
    sellPrice: 349,
    status: "Live",
  },
  {
    sku: "TG-SG24-PRV",
    product: "Privacy Tempered Glass — Model S24",
    channel: "Flipkart",
    category: "Tempered Glass",
    units30: 184,
    units90: 503,
    available: 0,
    sellPrice: 449,
    status: "Out of stock",
  },
  {
    sku: "BC-MT70-LTH",
    product: "Leather Back Cover — Model E70",
    channel: "Myntra",
    category: "Back Cover",
    units30: 143,
    units90: 388,
    available: 310,
    sellPrice: 599,
    status: "Live",
  },
  {
    sku: "GB-FEST-03",
    product: "Festive Gift Box Bundle — 3 Piece",
    channel: "Shopify",
    category: "Gift Box Bundle",
    units30: 97,
    units90: 268,
    available: 85,
    sellPrice: 1099,
    status: "Live",
  },
  {
    sku: "TG-MT70-9H",
    product: "9H Tempered Glass — Model E70",
    channel: "Myntra",
    category: "Tempered Glass",
    units30: 121,
    units90: 342,
    available: 46,
    sellPrice: 229,
    status: "Low stock",
  },
  {
    sku: "BC-VV29-TPU",
    product: "TPU Back Cover — Model V29",
    channel: "Amazon",
    category: "Back Cover",
    units30: 209,
    units90: 617,
    available: 188,
    sellPrice: 279,
    status: "Live",
  },
  {
    sku: "TG-VV29-FUL",
    product: "Full Cover Tempered Glass — Model V29",
    channel: "Flipkart",
    category: "Tempered Glass",
    units30: 238,
    units90: 694,
    available: 154,
    sellPrice: 219,
    status: "Live",
  },
  {
    sku: "GB-WED-05",
    product: "Wedding Gift Box Bundle — 5 Piece",
    channel: "Shopify",
    category: "Gift Box Bundle",
    units30: 54,
    units90: 161,
    available: 32,
    sellPrice: 1799,
    status: "Low stock",
  },
  {
    sku: "BC-OP12-ARM",
    product: "Armour Back Cover — Model N12",
    channel: "Myntra",
    category: "Back Cover",
    units30: 168,
    units90: 455,
    available: 97,
    sellPrice: 399,
    status: "Live",
  },
  {
    sku: "TG-OP12-MAT",
    product: "Matte Tempered Glass — Model N12",
    channel: "Amazon",
    category: "Tempered Glass",
    units30: 132,
    units90: 371,
    available: 0,
    sellPrice: 249,
    status: "Out of stock",
  },
];

// --- Inventory & procurement ----------------------------------------------

export const inventoryFlow = [
  { month: "Jun", received: 4200, ordered: 4800, pending: 600 },
  { month: "Jul", received: 3850, ordered: 4100, pending: 850 },
  { month: "Aug", received: 5100, ordered: 5400, pending: 1150 },
  { month: "Sep", received: 4650, ordered: 4900, pending: 1400 },
  { month: "Oct", received: 5900, ordered: 6300, pending: 1800 },
  { month: "Nov", received: 5400, ordered: 5750, pending: 2150 },
];

export const inventoryAgeing = [
  { bucket: "0–30 days", units: 6200 },
  { bucket: "31–60 days", units: 3450 },
  { bucket: "61–90 days", units: 1780 },
  { bucket: "90+ days", units: 920 },
];

export const purchaseOrders = [
  {
    po: "PO-2411-018",
    vendor: "Vendor A",
    category: "Back Cover",
    ordered: 1200,
    received: 1200,
    pending: 0,
    status: "Closed",
  },
  {
    po: "PO-2411-021",
    vendor: "Vendor B",
    category: "Tempered Glass",
    ordered: 2000,
    received: 1450,
    pending: 550,
    status: "Partially received",
  },
  {
    po: "PO-2411-026",
    vendor: "Vendor A",
    category: "Back Cover",
    ordered: 900,
    received: 0,
    pending: 900,
    status: "In transit",
  },
  {
    po: "PO-2412-003",
    vendor: "Vendor C",
    category: "Gift Box Bundle",
    ordered: 450,
    received: 450,
    pending: 0,
    status: "Closed",
  },
  {
    po: "PO-2412-007",
    vendor: "Vendor B",
    category: "Tempered Glass",
    ordered: 1600,
    received: 900,
    pending: 700,
    status: "Partially received",
  },
  {
    po: "PO-2412-011",
    vendor: "Vendor D",
    category: "Back Cover",
    ordered: 750,
    received: 0,
    pending: 750,
    status: "Awaiting dispatch",
  },
];

export const reorderList = [
  { sku: "TG-SG24-PRV", available: 0, reorderLevel: 150, suggested: 600, urgency: "Critical" },
  { sku: "TG-OP12-MAT", available: 0, reorderLevel: 120, suggested: 500, urgency: "Critical" },
  { sku: "GB-WED-05", available: 32, reorderLevel: 60, suggested: 150, urgency: "High" },
  { sku: "TG-MT70-9H", available: 46, reorderLevel: 100, suggested: 400, urgency: "High" },
  { sku: "BC-SG24-CLR", available: 62, reorderLevel: 120, suggested: 450, urgency: "Medium" },
  { sku: "BC-OP12-ARM", available: 97, reorderLevel: 110, suggested: 300, urgency: "Medium" },
];

// --- Product launch tracker -------------------------------------------------

export const launchTracker = [
  {
    model: "Model A13 Pro",
    brand: "Brand R",
    launchStage: "Launched",
    launchDate: "2026-09-12",
    backCover: "Live",
    temperedGlass: "Live",
    procurement: "Received",
    qc: "Passed",
    listing: "Live",
  },
  {
    model: "Model S24",
    brand: "Brand S",
    launchStage: "Launched",
    launchDate: "2026-09-28",
    backCover: "Live",
    temperedGlass: "Pending",
    procurement: "Partially received",
    qc: "Passed",
    listing: "Partially live",
  },
  {
    model: "Model E70",
    brand: "Brand M",
    launchStage: "Launched",
    launchDate: "2026-10-05",
    backCover: "Live",
    temperedGlass: "Live",
    procurement: "Received",
    qc: "Passed",
    listing: "Live",
  },
  {
    model: "Model V29",
    brand: "Brand V",
    launchStage: "Launched",
    launchDate: "2026-10-18",
    backCover: "Live",
    temperedGlass: "Live",
    procurement: "Received",
    qc: "Passed",
    listing: "Live",
  },
  {
    model: "Model N12",
    brand: "Brand O",
    launchStage: "Upcoming",
    launchDate: "2026-11-25",
    backCover: "In development",
    temperedGlass: "Sample approved",
    procurement: "PO raised",
    qc: "Sample stage",
    listing: "Draft",
  },
  {
    model: "Model G84",
    brand: "Brand M",
    launchStage: "Upcoming",
    launchDate: "2026-12-04",
    backCover: "Sample approved",
    temperedGlass: "In development",
    procurement: "PO raised",
    qc: "Sample stage",
    listing: "Not created",
  },
  {
    model: "Model F15",
    brand: "Brand S",
    launchStage: "Upcoming",
    launchDate: "2026-12-16",
    backCover: "Pending",
    temperedGlass: "Pending",
    procurement: "Not started",
    qc: "Not started",
    listing: "Not created",
  },
  {
    model: "Model A36",
    brand: "Brand R",
    launchStage: "Launched",
    launchDate: "2026-08-22",
    backCover: "Live",
    temperedGlass: "Live",
    procurement: "Received",
    qc: "Passed",
    listing: "Live",
  },
];

// --- Compatibility checker --------------------------------------------------

export const compatibilityDb = [
  {
    brand: "Brand R",
    model: "Model A13 Pro",
    dimensions: "162.4 × 75.7 × 8.2 mm",
    cameraCutout: "Square module, top-left",
    backCover: [
      { type: "Matte TPU", sku: "BC-RL13P-MT", fit: "Exact fit" },
      { type: "Armour hybrid", sku: "BC-RL13P-AR", fit: "Exact fit" },
    ],
    temperedGlass: [
      { type: "9H full cover", sku: "TG-RL13P-9H", fit: "Exact fit" },
      { type: "Privacy", sku: "TG-RL13P-PRV", fit: "Exact fit" },
    ],
  },
  {
    brand: "Brand S",
    model: "Model S24",
    dimensions: "147.0 × 70.6 × 7.6 mm",
    cameraCutout: "Vertical triple lens, top-left",
    backCover: [{ type: "Clear TPU", sku: "BC-SG24-CLR", fit: "Exact fit" }],
    temperedGlass: [
      { type: "Privacy", sku: "TG-SG24-PRV", fit: "Exact fit" },
      { type: "9H full cover", sku: "TG-SG24-9H", fit: "Shared with Model S23" },
    ],
  },
  {
    brand: "Brand S",
    model: "Model F15",
    dimensions: "160.1 × 74.5 × 8.0 mm",
    cameraCutout: "Vertical dual lens, top-left",
    backCover: [{ type: "Clear TPU", sku: "BC-SF15-CLR", fit: "Sample stage" }],
    temperedGlass: [{ type: "9H full cover", sku: "TG-SF15-9H", fit: "Sample stage" }],
  },
  {
    brand: "Brand M",
    model: "Model E70",
    dimensions: "161.2 × 73.1 × 7.9 mm",
    cameraCutout: "Oval module, top-left",
    backCover: [
      { type: "Leather finish", sku: "BC-MT70-LTH", fit: "Exact fit" },
      { type: "Matte TPU", sku: "BC-MT70-MT", fit: "Exact fit" },
    ],
    temperedGlass: [{ type: "9H full cover", sku: "TG-MT70-9H", fit: "Exact fit" }],
  },
  {
    brand: "Brand M",
    model: "Model G84",
    dimensions: "160.0 × 74.4 × 7.6 mm",
    cameraCutout: "Vertical dual lens, top-left",
    backCover: [{ type: "Matte TPU", sku: "BC-MG84-MT", fit: "Sample approved" }],
    temperedGlass: [{ type: "9H full cover", sku: "TG-MG84-9H", fit: "In development" }],
  },
  {
    brand: "Brand V",
    model: "Model V29",
    dimensions: "164.2 × 74.4 × 7.5 mm",
    cameraCutout: "Round module, centre-top",
    backCover: [{ type: "TPU soft", sku: "BC-VV29-TPU", fit: "Exact fit" }],
    temperedGlass: [{ type: "Full cover", sku: "TG-VV29-FUL", fit: "Exact fit" }],
  },
  {
    brand: "Brand O",
    model: "Model N12",
    dimensions: "163.3 × 75.3 × 8.2 mm",
    cameraCutout: "Round module, top-left",
    backCover: [{ type: "Armour hybrid", sku: "BC-OP12-ARM", fit: "Exact fit" }],
    temperedGlass: [{ type: "Matte 9H", sku: "TG-OP12-MAT", fit: "Exact fit" }],
  },
  {
    brand: "Brand R",
    model: "Model A36",
    dimensions: "159.9 × 73.3 × 7.9 mm",
    cameraCutout: "Square module, top-left",
    backCover: [{ type: "Matte TPU", sku: "BC-RA36-MT", fit: "Exact fit" }],
    temperedGlass: [{ type: "9H full cover", sku: "TG-RA36-9H", fit: "Shared with Model A35" }],
  },
];

// --- Pricing tracker --------------------------------------------------------

export const pricingTracker = [
  {
    sku: "BC-RL13P-MT",
    product: "Matte Back Cover — Model A13 Pro",
    channel: "Amazon",
    ourPrice: 299,
    marketLow: 279,
    marketHigh: 349,
    lastUpdated: "2026-11-08",
  },
  {
    sku: "TG-RL13P-9H",
    product: "9H Tempered Glass — Model A13 Pro",
    channel: "Amazon",
    ourPrice: 199,
    marketLow: 189,
    marketHigh: 259,
    lastUpdated: "2026-11-08",
  },
  {
    sku: "BC-SG24-CLR",
    product: "Clear Back Cover — Model S24",
    channel: "Flipkart",
    ourPrice: 349,
    marketLow: 329,
    marketHigh: 419,
    lastUpdated: "2026-11-06",
  },
  {
    sku: "TG-SG24-PRV",
    product: "Privacy Tempered Glass — Model S24",
    channel: "Flipkart",
    ourPrice: 449,
    marketLow: 419,
    marketHigh: 549,
    lastUpdated: "2026-11-06",
  },
  {
    sku: "BC-MT70-LTH",
    product: "Leather Back Cover — Model E70",
    channel: "Myntra",
    ourPrice: 599,
    marketLow: 549,
    marketHigh: 699,
    lastUpdated: "2026-11-04",
  },
  {
    sku: "GB-FEST-03",
    product: "Festive Gift Box Bundle — 3 Piece",
    channel: "Shopify",
    ourPrice: 1099,
    marketLow: 999,
    marketHigh: 1299,
    lastUpdated: "2026-11-09",
  },
  {
    sku: "BC-VV29-TPU",
    product: "TPU Back Cover — Model V29",
    channel: "Amazon",
    ourPrice: 279,
    marketLow: 289,
    marketHigh: 339,
    lastUpdated: "2026-11-07",
  },
  {
    sku: "TG-VV29-FUL",
    product: "Full Cover Tempered Glass — Model V29",
    channel: "Flipkart",
    ourPrice: 219,
    marketLow: 199,
    marketHigh: 269,
    lastUpdated: "2026-11-07",
  },
];

// --- Listing status ---------------------------------------------------------

export const listingStatus = [
  { name: "Live", value: 842 },
  { name: "Pending QC", value: 96 },
  { name: "Draft", value: 63 },
  { name: "Blocked", value: 21 },
];

export const listingStatusColors = ["#2563eb", "#60a5fa", "#93c5fd", "#cbd5e1"];
