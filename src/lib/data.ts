export const NAV_LINKS = [
  { label: "The System", href: "#system" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Growth Loop", href: "#growth-loop" },
  { label: "AI Workforce", href: "#ai-workforce" },
  { label: "Process", href: "#process" },
];

export type SystemCard = {
  index: string;
  title: string;
  blurb: string;
  services: string[];
  icon: "signal" | "grid" | "pulse" | "bolt" | "star" | "wave";
  wide?: boolean;
};

export const SYSTEMS: SystemCard[] = [
  {
    index: "SYS.01",
    title: "Lead Generation Engine",
    blurb: "High-intent demand, captured at the exact moment it exists.",
    services: ["Google Ads", "SEO", "Local Search", "Landing Pages", "Funnel Building"],
    icon: "signal",
    wide: true,
  },
  {
    index: "SYS.02",
    title: "Intelligence Core — CRM",
    blurb: "One pipeline. Every contact, opportunity, and dollar — tracked.",
    services: ["Custom CRM", "Pipelines", "Sales Tracking", "Reporting"],
    icon: "grid",
  },
  {
    index: "SYS.03",
    title: "AI Workforce",
    blurb: "Virtual employees that answer, book, qualify, and follow up.",
    services: ["AI Voice Agents", "AI Chatbots", "AI Follow-Up"],
    icon: "pulse",
  },
  {
    index: "SYS.04",
    title: "Automation Grid",
    blurb: "Repetitive work removed. Every opportunity answered in seconds.",
    services: ["SMS & Email Automation", "Missed-Call Response", "Workflow Automation", "Lead Routing", "Business Automation"],
    icon: "bolt",
    wide: true,
  },
  {
    index: "SYS.05",
    title: "Reputation Systems",
    blurb: "Authority engineered — reviews requested, answered, monitored.",
    services: ["Review Requests", "AI Review Responses", "Reputation Monitoring"],
    icon: "star",
  },
  {
    index: "SYS.06",
    title: "Content & Presence",
    blurb: "A brand that looks as intelligent as the systems behind it.",
    services: ["Content Creation", "Social Media", "Founder Brand"],
    icon: "wave",
  },
];

export type LoopNode = {
  index: string;
  title: string;
  desc: string;
};

export const LOOP_NODES: LoopNode[] = [
  { index: "01", title: "Traffic", desc: "Google, Meta, SEO, and local search — high-intent attention, captured." },
  { index: "02", title: "Landing Page", desc: "Conversion-engineered pages turn clicks into contacts." },
  { index: "03", title: "CRM", desc: "Every lead lands in one intelligent pipeline. Nothing falls through." },
  { index: "04", title: "AI Follow-Up", desc: "Text, email, and voice response in seconds — 24 hours a day." },
  { index: "05", title: "Appointment", desc: "Qualified prospects book themselves onto your calendar." },
  { index: "06", title: "Customer", desc: "Sales tracked, handoffs automated, every interaction organized." },
  { index: "07", title: "Review", desc: "Five-star reputation requested, answered, and monitored by AI." },
  { index: "08", title: "Repeat Business", desc: "Reactivation campaigns turn customers into compounding revenue." },
];

export const ECOSYSTEM_CHIPS = [
  "AI",
  "CRM",
  "Automation",
  "Lead Generation",
  "Sales Infrastructure",
  "Customer Experience",
  "Data Intelligence",
];

export const AI_EMPLOYEES = [
  {
    code: "VOX-01",
    role: "AI Voice Agent",
    line: "Answers every call. Books the appointment before your competitor picks up.",
    caps: ["Inbound & outbound calls", "FAQ handling", "Calendar booking"],
  },
  {
    code: "CHT-02",
    role: "AI Chat Agent",
    line: "Lives on your website and socials. Converts visitors while you sleep.",
    caps: ["Instant web chat", "Lead qualification", "Smart handoff"],
  },
  {
    code: "FLW-03",
    role: "AI Follow-Up Agent",
    line: "Responds to every lead in under a minute — by text, email, and voice.",
    caps: ["Speed-to-lead < 60s", "Multi-channel sequences", "No lead left behind"],
  },
  {
    code: "OPS-04",
    role: "AI Operations Agent",
    line: "Routes leads, notifies your team, and keeps the pipeline honest.",
    caps: ["Lead routing", "Internal alerts", "Pipeline hygiene"],
  },
];

export const INDUSTRIES = [
  "Medical",
  "Dental",
  "Legal",
  "Home Services",
  "Construction",
  "Roofing",
  "Remediation",
  "HVAC",
  "Plastic Surgery",
  "Wellness",
  "Financial",
  "Professional Services",
];

export const PROCESS_STEPS = [
  {
    index: "PH.01",
    title: "Business Audit",
    desc: "We map where leads leak, calls go unanswered, and hours disappear into manual work.",
  },
  {
    index: "PH.02",
    title: "Strategy Session",
    desc: "You see the exact system architecture we'll engineer — before anything is built.",
  },
  {
    index: "PH.03",
    title: "System Build",
    desc: "CRM, automations, AI employees, and lead engines — constructed and connected.",
  },
  {
    index: "PH.04",
    title: "Launch",
    desc: "The system goes live. Every lead captured, every follow-up instant, every metric tracked.",
  },
  {
    index: "PH.05",
    title: "Optimize & Scale",
    desc: "We tune the machine monthly — compounding performance, predictable growth.",
  },
];

export const CONTACT = {
  email: "hello@quantumimpactmarketing.com", // TODO: replace with live email
  phone: "(305) 000-0000", // TODO: replace with live phone
};
