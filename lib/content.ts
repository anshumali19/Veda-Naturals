export type HeroSlide = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  image: string;
  imageAlt: string;
  badges: string[];
  preview: { no: string; title: string; desc: string; icon: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "confidential-care",
    eyebrow: "DISCREET • SAFE • DOCTOR-LED",
    heading: "Confidential Herbal Healthcare You Can Trust.",
    body: "Expert consultation, genuine lab-tested formulations and discreet delivery: personalised Ayurvedic care from the comfort of your home.",
    primary: { label: "Consult a Doctor →", href: "/shop" },
    secondary: { label: "Explore Treatments", href: "/shop" },
    image: "/images/hero/Sunlit_Herbal_Wellness_Still_Life.webp",
    imageAlt: "Amber apothecary bottles with Ayurvedic herbs",
    badges: ["100% Natural", "50,000+ Happy Customers", "4.8/5 Rating"],
    preview: { no: "01", title: "Ancient Herbal Care", desc: "Time-tested formulations", icon: "spa" },
  },
  {
    id: "personalised-solutions",
    eyebrow: "PERSONALISED • EXPERT-LED",
    heading: "Ayurvedic Solutions Designed Around You.",
    body: "Get personalised guidance from qualified practitioners and discover formulations selected around your individual wellness needs.",
    primary: { label: "Find Your Treatment →", href: "/shop" },
    secondary: { label: "Meet Our Doctors", href: "/science" },
    image: "/images/hero/Sunlit_Ayurvedic_Still_Life.webp",
    imageAlt: "Mortar and pestle with fresh Ayurvedic herbs",
    badges: ["Vaidya Reviewed", "Personalised Plans"],
    preview: { no: "02", title: "Personalised Solutions", desc: "Guidance around your needs", icon: "stethoscope" },
  },
  {
    id: "pure-formulations",
    eyebrow: "PURE • TESTED • AUTHENTIC",
    heading: "Ancient Ingredients. Modern Formulations.",
    body: "Carefully selected Ayurvedic ingredients combined with modern formulation standards for everyday wellness.",
    primary: { label: "Explore Formulations →", href: "/shop" },
    secondary: { label: "Learn About Our Science", href: "/science" },
    image: "/images/hero/Sunlit_Herbal_Wellness_Still_Life_1.webp",
    imageAlt: "Bowls of Ayurvedic herbs and roots",
    badges: ["Lab-Tested", "Pure Ingredients"],
    preview: { no: "03", title: "Pure Formulations", desc: "Selected ingredients", icon: "science" },
  },
  {
    id: "private-healthcare",
    eyebrow: "PRIVATE • SECURE • DISCREET",
    heading: "Healthcare That Respects Your Privacy.",
    body: "From private consultation to discreet packaging, every step is designed around your comfort and confidentiality.",
    primary: { label: "Consult a Doctor →", href: "/shop" },
    secondary: { label: "How It Works", href: "/about" },
    image: "/images/hero/Sunlit_Herbal_Still_Life_with_Botanical_Elegance.webp",
    imageAlt: "Discreet Ayurvedic wellness packaging with herbs",
    badges: ["Discreet Packaging", "Private Consultation"],
    preview: { no: "04", title: "Private Healthcare", desc: "Comfort and confidentiality", icon: "lock" },
  },
];

export const heroTrust = ["Private", "Doctor Led", "Genuine Medicines"];
