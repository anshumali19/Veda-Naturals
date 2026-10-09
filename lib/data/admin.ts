// Mock admin dataset transcribed from design exports.
// Replace with OMS / PIM / CRM / CMS APIs when backend lands.

export type AdminOrder = {
  id: string;
  customer: string;
  city: string;
  items: number;
  total: number;
  payment: string;
  paymentOk: boolean;
  status: "Pending Review" | "Pending Verification" | "Dispatched" | "Delivered" | "Cancelled";
  carrier: string;
  carrierNote: string;
  date: string;
};

export const adminOrders: AdminOrder[] = [
  { id: "VN-8950", customer: "Aarav Sharma", city: "Bengaluru", items: 2, total: 2697, payment: "Prepaid UPI", paymentOk: true, status: "Pending Review", carrier: "BlueDart Air", carrierNote: "Manifest ready", date: "21 Oct" },
  { id: "VN-8949", customer: "Pooja Deshmukh", city: "Mumbai", items: 1, total: 699, payment: "COD (Uncollected)", paymentOk: false, status: "Pending Verification", carrier: "Delhivery", carrierNote: "Pending Manifest", date: "21 Oct" },
  { id: "VN-8948", customer: "Manpreet Singh", city: "Delhi", items: 2, total: 1499, payment: "Prepaid UPI", paymentOk: true, status: "Dispatched", carrier: "BlueDart Air", carrierNote: "In transit", date: "20 Oct" },
  { id: "VN-8947", customer: "Kavita Pillai", city: "Chennai", items: 3, total: 2598, payment: "Prepaid UPI", paymentOk: true, status: "Delivered", carrier: "BlueDart", carrierNote: "Delivered 19 Oct", date: "19 Oct" },
  { id: "VN-8946", customer: "Rajesh Kulkarni", city: "Pune", items: 1, total: 1499, payment: "COD (Uncollected)", paymentOk: false, status: "Pending Review", carrier: "Delhivery", carrierNote: "Pending Manifest", date: "19 Oct" },
  { id: "VN-8945", customer: "Alok Ranjan", city: "Kolkata", items: 1, total: 700, payment: "COD (Collected)", paymentOk: true, status: "Delivered", carrier: "Delhivery", carrierNote: "COD collected", date: "18 Oct" },
  { id: "VN-8944", customer: "Neha Singhania", city: "Jaipur", items: 2, total: 1698, payment: "Prepaid Card", paymentOk: true, status: "Pending Verification", carrier: "BlueDart", carrierNote: "QC hold", date: "18 Oct" },
  { id: "VN-8943", customer: "Vikramaditya Roy", city: "Hyderabad", items: 1, total: 749, payment: "COD Refused", paymentOk: false, status: "Cancelled", carrier: "—", carrierNote: "RTO initiated", date: "17 Oct" },
];

export type StockRow = {
  name: string;
  sku: string;
  batch: string;
  hub: string;
  units: number;
  status: "Healthy" | "Low" | "Critical" | "Draft";
  price: number;
};

export const stockRows: StockRow[] = [
  { name: "Ashwagandha Root Powder", sku: "VN-POW-01", batch: "AGW-24-91", hub: "Delhi Hub (Rack A-12)", units: 428, status: "Healthy", price: 899 },
  { name: "Himalayan Shilajit Resin", sku: "VN-RES-02", batch: "SHJ-24-14", hub: "Delhi Vault", units: 182, status: "Healthy", price: 899 },
  { name: "Nirogi Pachan Churna", sku: "VN-CHU-03", batch: "NPC-24-08", hub: "Bengaluru Hub (Rack C-02)", units: 310, status: "Healthy", price: 699 },
  { name: "Triphala Shodhan Tablets", sku: "VN-TAB-04", batch: "TRP-24-03", hub: "Bengaluru Hub (Rack B-04)", units: 14, status: "Critical", price: 700 },
  { name: "Gokshura Men's Vigor Powder", sku: "VN-POW-05", batch: "GOK-24-11", hub: "Delhi Hub (Rack B-08)", units: 8, status: "Critical", price: 699 },
  { name: "Neem Karela Jamun Powder", sku: "VN-POW-06", batch: "NKJ-24-09", hub: "Delhi Hub (Rack A-04)", units: 45, status: "Low", price: 799 },
  { name: "Kumkumadi Radiance Oil", sku: "VN-OIL-07", batch: "KMK-24-18", hub: "Bengaluru Hub (Rack O-01)", units: 94, status: "Healthy", price: 999 },
  { name: "Shatavari Female Balance", sku: "VN-POW-08", batch: "STV-24-05", hub: "Delhi Hub (Rack A-19)", units: 215, status: "Healthy", price: 749 },
  { name: "Brahmi Mind & Focus Tablets", sku: "VN-TAB-09", batch: "BRH-24-01", hub: "Delhi Quarantine Bay 2", units: 160, status: "Draft", price: 749 },
];

export type Customer = {
  name: string;
  city: string;
  tier: "Gold Patron" | "Silver Patron" | "Platinum";
  dosha: string;
  orders: number;
  ltv: number;
};

export const customers: Customer[] = [
  { name: "Dr. Arvind Swamy", city: "Kochi", tier: "Platinum", dosha: "Vata-Pitta", orders: 18, ltv: 24500 },
  { name: "Pooja Deshmukh", city: "Mumbai", tier: "Gold Patron", dosha: "Pitta-Vata", orders: 9, ltv: 12800 },
  { name: "Manpreet Singh", city: "Delhi", tier: "Silver Patron", dosha: "Kapha-Pitta", orders: 5, ltv: 6400 },
  { name: "Kavita Pillai", city: "Chennai", tier: "Gold Patron", dosha: "Pitta-Kapha", orders: 11, ltv: 15200 },
  { name: "Rajesh Kulkarni", city: "Pune", tier: "Silver Patron", dosha: "Vata-Kapha", orders: 4, ltv: 5100 },
  { name: "Alok Ranjan", city: "Kolkata", tier: "Silver Patron", dosha: "Kapha-Vata", orders: 3, ltv: 3900 },
  { name: "Neha Singhania", city: "Jaipur", tier: "Gold Patron", dosha: "Pitta-Vata", orders: 7, ltv: 9800 },
  { name: "Vikramaditya Roy", city: "Hyderabad", tier: "Silver Patron", dosha: "Vata-Pitta", orders: 2, ltv: 2100 },
];

export type Category = { name: string; slug: string; skus: number; children: string[]; status: "Live" | "Draft" };

export const categories: Category[] = [
  { name: "Herbal Powders & Churna", slug: "powders-churna", skus: 18, children: ["Ashwagandha & Adaptogens", "Digestive Churnas"], status: "Live" },
  { name: "Pure Resins & Mineral Shodhan", slug: "resins-shodhan", skus: 6, children: ["Shilajit Grades"], status: "Live" },
  { name: "Classical Tablets & Vati", slug: "tablets-vati", skus: 8, children: ["Triphala & Detox", "Medhya Rasayana"], status: "Live" },
  { name: "Medicated Oils & Taila", slug: "oils-taila", skus: 4, children: ["Keshya Oils", "Varnya Elixirs"], status: "Live" },
  { name: "Herbal Decoctions & Kwath", slug: "kwath", skus: 2, children: [], status: "Live" },
  { name: "Seasonal Rasayana & Lehya", slug: "rasayana-lehya", skus: 3, children: [], status: "Draft" },
];

export type Article = {
  title: string;
  category: string;
  status: "Published" | "Scheduled" | "Draft";
  date: string;
  seo: number;
  views: string;
};

export const articles: Article[] = [
  { title: "The Science of Ojas: How Ashwagandha Lowers Serum Cortisol", category: "Ojas & Vitality", status: "Published", date: "Oct 18, 2024", seo: 92, views: "18.2k" },
  { title: "Shilajit Resin: Minerals, Fulvic Acid, and Cellular ATP Production", category: "Clinical Research", status: "Published", date: "Oct 14, 2024", seo: 88, views: "14.7k" },
  { title: "Rekindling Digestive Fire: 5 Ayurvedic Rules for Optimal Agni", category: "Digestive Health & Agni", status: "Published", date: "Oct 08, 2024", seo: 85, views: "11.3k" },
  { title: "Brahmi & Medhya: What Trials Say About Focus", category: "Clinical Research", status: "Published", date: "Sep 29, 2024", seo: 81, views: "8.9k" },
  { title: "Winter Rasayana Protocol: Building Ojas in Hemanta Ritu", category: "Seasonal Rituals", status: "Scheduled", date: "Nov 02, 2024", seo: 74, views: "—" },
  { title: "Kumkumadi Taila: Saffron Elixir Grading Guide", category: "Skin & Kesh", status: "Draft", date: "Unpublished", seo: 52, views: "—" },
];

export const dashboardKpis = [
  { label: "Total Revenue", value: "₹28,45,290", delta: "+18.4%", icon: "currency_rupee" },
  { label: "Total Orders", value: "2,842", delta: "+12.1% · AOV ₹1,001", icon: "shopping_bag" },
  { label: "Orders Today", value: "148", delta: "₹1,54,200 GMV", icon: "today" },
  { label: "Pending Dispatch", value: "36", delta: "18 COD queued", icon: "local_shipping" },
  { label: "Customers", value: "48,210", delta: "34% repeat", icon: "group" },
  { label: "Low Stock", value: "3 SKUs", delta: "2 critical", icon: "warning" },
];

export const fulfillmentQueue = [
  { id: "VN-88492", customer: "Aarav Sharma", carrier: "BlueDart Air", state: "Express Dispatch · Priority", items: "Shilajit 20g (SHJ-24-14) + Ashwagandha 200g (AGW-24-91)", note: "Cold pack required" },
  { id: "VN-88495", customer: "Pooja Deshmukh", carrier: "Delhivery Air", state: "QC Verification Pending", items: "Nirogi Pachan 150g (NPC-24-08)", note: "Batch assay hold" },
  { id: "VN-88488", customer: "Manpreet Singh", carrier: "BlueDart Express", state: "Packed & Stamped", items: "Triphala 60 vati (TRP-24-03)", note: "Packed 45 mins ago" },
];

export function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
