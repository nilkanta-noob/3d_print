export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "What file formats do you accept?",
    answer: "We accept .stl, .obj, .stp, .iges, and .3mf files, up to 100MB per upload."
  },
  {
    question: "How long does printing and delivery take?",
    answer: "Standard delivery across India takes 3–4 business days from order confirmation. Within Kolkata, Porter delivery and B2B pickup are faster."
  },
  {
    question: "Do you deliver outside Kolkata?",
    answer: "Yes. We ship pan-India via standard courier (3–4 days). Within Kolkata, we also support B2B drop-offs/pickups and faster delivery via Porter."
  },
  {
    question: "Can students get a discount?",
    answer: "Yes — PLA is ₹2.5/g instead of ₹3.5/g with a valid college ID or referral. Tick \"Apply Student Discount\" in the quote form and upload your ID."
  },
  {
    question: "What materials do you offer?",
    answer: "PLA, PLA+ and PETG. The Materials guide compares their strength, heat resistance and best uses."
  },
  {
    question: "What printer and settings do you use?",
    answer: "We print on a Creality CR-10 SE at 0.2mm layers by default. Ask for 0.12mm in your quote request if the part needs finer detail."
  },
  {
    question: "How is pricing calculated?",
    answer: "Pricing is per gram of material used, based on your part's weight after slicing — not a flat fee. The Pricing section on our home page lists standard and student rates."
  },
  {
    question: "Do I need to be a student to order?",
    answer: "No — anyone can order. The student discount applies only if you upload a valid college ID or use a referral at checkout."
  },
  {
    question: "What's your minimum order size?",
    answer: "No minimum — order any quantity or weight. Delivery is free above ₹599; below that, delivery and packaging are added separately."
  },
  {
    question: "How do I pay?",
    answer: "Delivery orders (anywhere in India, or Kolkata delivery): Prepaid only, via UPI.\n\nB2B / pickup orders (Kolkata): Pay via UPI or cash. A partial advance may be required to confirm larger or first-time orders, with the balance payable on pickup."
  },
  {
    question: "Can I get a custom finish (sanding, priming, painting)?",
    answer: "Yes. Select your preferred finish under \"Finalize (Post-Processing)\" when submitting your quote — options include sanding & smoothing, priming, or full custom painting."
  },
  {
    question: "What if my print fails or has defects?",
    answer: "We only deliver quality-checked prints — we don't ship failed or defective prints. If an issue occurs on our end during production, it's reprinted at no extra cost to you before dispatch."
  },
  {
    question: "Can I track my order status?",
    answer: "Order status tracking is coming soon. For now, updates are shared directly via WhatsApp."
  }
];
