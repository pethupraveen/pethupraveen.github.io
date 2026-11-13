// Case studies describe the kind of work and the structure of each tool.
// They deliberately contain no sales figures, growth claims, campaign results
// or employer/client names beyond what the resume itself states. Screens shown
// on the Excel & Reporting page use clearly labelled sample data.

export const projects = [
  {
    id: "sales-mis-dashboard",
    number: "01",
    title: "E-commerce Sales MIS Dashboard",
    category: "Reporting",
    icon: "BarChart3",
    tagline:
      "One reporting view for channel-wise and SKU-wise sales, with 30-day and 90-day performance side by side.",
    context:
      "Each marketplace exports sales in its own shape, on its own schedule. Reviewing them one by one made it slow to see which SKUs were moving and which channel a product was performing on. This dashboard consolidates those exports into a single recurring report.",
    shows: [
      "Channel-wise sales across Amazon, Flipkart, Myntra and Shopify",
      "SKU-wise sales ranked within each channel",
      "30-day versus 90-day comparison for the same SKU",
      "Sales trend over the reporting period",
      "Inventory availability alongside sales, so demand and stock read together",
      "Product performance grouped by category",
    ],
    workflow: [
      "Pull the sales export from each marketplace for the reporting window.",
      "Normalise SKU codes and channel names so the same product matches across files.",
      "Build the 30-day and 90-day aggregates per SKU and per channel.",
      "Join current inventory availability onto the sales lines.",
      "Refresh the dashboard sheets and charts and circulate the report.",
    ],
    stack: ["Advanced Excel", "Pivot tables", "Marketplace exports", "Charting"],
    demo: "sales",
  },
  {
    id: "inventory-procurement-tracker",
    number: "02",
    title: "Inventory & Procurement Tracker",
    category: "Operations",
    icon: "Boxes",
    tagline:
      "Purchase order to shelf availability in one place, with reorder points flagged before a listing runs dry.",
    context:
      "Stock ordered, stock received and stock still pending sat in different places, which made it hard to answer a simple question: can we keep this SKU live for the next two weeks? The tracker brings the procurement pipeline and current availability into the same view.",
    shows: [
      "Stock received against each purchase order",
      "Stock ordered and still open with vendors",
      "Pending stock quantities by PO and by category",
      "Reorder tracking against per-SKU reorder levels",
      "SKU availability as it stands today",
      "Inventory ageing bucketed by days on hand",
    ],
    workflow: [
      "Record each purchase order with vendor, SKU, quantity and expected date.",
      "Update received quantities as shipments arrive and reconcile against the PO.",
      "Calculate pending quantity as ordered minus received, per line.",
      "Compare current availability against the reorder level for each SKU.",
      "Flag critical and high-urgency SKUs for the next procurement cycle.",
    ],
    stack: [
      "Advanced Excel",
      "AI-assisted web tool",
      "Purchase order records",
      "Stock reports",
    ],
    demo: "inventory",
  },
  {
    id: "mobile-launch-tracker",
    number: "03",
    title: "Mobile Model Launch Tracker",
    category: "Operations",
    icon: "Smartphone",
    tagline:
      "Tracks upcoming and newly launched handsets through to the back cover and tempered glass being live on each channel.",
    context:
      "Accessory demand follows handset launches. A model announced today needs a compatible back cover and tempered glass sampled, procured, QC'd and listed before interest peaks. This tracker keeps every model moving through those stages visibly.",
    shows: [
      "Upcoming mobile models and their expected launch dates",
      "Newly launched models already in the market",
      "Back-cover compatibility status per model",
      "Tempered-glass compatibility status per model",
      "Procurement status from sample to received",
      "Listing status and QC status per accessory",
      "Live versus pending listings across channels",
    ],
    workflow: [
      "Add each announced or launched model to the tracker with its launch window.",
      "Record back-cover and tempered-glass development stage against the model.",
      "Track sample approval, then PO raised, then stock received.",
      "Log QC outcome before the listing is pushed live.",
      "Mark each channel's listing as draft, pending or live and chase the gaps.",
    ],
    stack: ["Advanced Excel", "AI-assisted web tool", "Launch calendar", "Listing status"],
    demo: "launch",
  },
  {
    id: "compatibility-checker",
    number: "04",
    title: "Product Compatibility Checker",
    category: "Tooling",
    icon: "SearchCheck",
    tagline:
      "A searchable mobile model database that answers which back cover and which tempered glass fit a given handset.",
    context:
      "Compatibility questions arrive constantly, from listing work and from customer queries alike. Answering them from memory or from scattered sheets invites mistakes, so the model database and matching logic were moved into a tool anyone can search.",
    shows: [
      "Mobile model database with dimensions and camera cutout details",
      "Brand-wise model search",
      "Back-cover compatibility per model, including shared-mould fits",
      "Tempered-glass compatibility per model",
      "Product matching logic applied consistently rather than by recall",
    ],
    workflow: [
      "Maintain a model record with brand, dimensions and camera cutout layout.",
      "Map each back cover and tempered glass SKU to the models it fits.",
      "Mark shared fits where one mould covers more than one model.",
      "Search by brand or model and return the matching accessory SKUs.",
      "Use the result to confirm listings and answer compatibility queries.",
    ],
    stack: [
      "AI-assisted web tool",
      "Model specification database",
      "Matching logic",
      "No-code automation",
    ],
    demo: "compatibility",
  },
  {
    id: "marketplace-operations",
    number: "05",
    title: "Marketplace Operations",
    category: "Operations",
    icon: "Store",
    tagline:
      "Day-to-day catalog, pricing and campaign operations across Amazon, Flipkart, Myntra and Shopify.",
    context:
      "Running the same catalog across four platforms means four sets of rules for content, images, stock and price. This is the ongoing operational work that keeps those listings correct, in stock and priced consistently.",
    shows: [
      "Amazon Seller Central — listings, catalog updates and PLA campaigns",
      "Amazon Vendor Central — catalog and operational updates",
      "Flipkart Seller Hub — catalog management and Flipkart Ads campaigns",
      "Myntra — catalog operations and PLA campaign management",
      "Shopify — product management, theme customization and gift-box bundles",
    ],
    workflow: [
      "Create and update listings to each platform's catalog and content rules.",
      "Keep stock and availability aligned with the inventory position.",
      "Monitor competitor pricing and coordinate manual and automated price updates.",
      "Run and maintain PLA and marketplace ad campaigns for visibility.",
      "Customise the Shopify storefront for product pages and bundle offers.",
    ],
    stack: [
      "Amazon Seller Central",
      "Amazon Vendor Central",
      "Flipkart Seller Hub",
      "Myntra",
      "Shopify",
    ],
    demo: "pricing",
  },
];

export const projectCategories = ["All", "Reporting", "Operations", "Tooling"];
