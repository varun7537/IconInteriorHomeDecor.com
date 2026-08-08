export type FaqEntry = {
  id: string;
  code: string;
  question: string;
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    id: "installation-time",
    code: "SW-01",
    question: "How long does installation take?",
    answer:
      "Most single rooms are completed within one to two weeks once materials arrive. Full-home projects typically run six to twelve weeks, depending on scope. You'll receive a room-by-room timeline before any work begins, so there are no surprises along the way.",
  },
  {
    id: "customized-designs",
    code: "SW-02",
    question: "Do you offer customized designs?",
    answer:
      "Always. Every project starts with a private consultation where we learn how you actually live in the space. From there, our designers build a concept, palette, and furniture plan around your home, your taste, and your budget, nothing is pulled from a catalog.",
  },
  {
    id: "home-visit",
    code: "SW-03",
    question: "Can you visit my home?",
    answer:
      "Yes. An in-home visit is part of our standard process for most bookings, so we can measure accurately, study natural light, and get a real feel for the space. Virtual consultations are also available if that suits your schedule better.",
  },
  {
    id: "office-interiors",
    code: "SW-04",
    question: "Do you provide office interiors?",
    answer:
      "We do. Our commercial studio designs offices, studios, and boutique retail spaces with the same attention to material and comfort we bring to residential work, balanced with the durability and function a workplace needs.",
  },
  {
    id: "service-areas",
    code: "SW-05",
    question: "What areas do you serve?",
    answer:
      "We take on projects across the metro area and within a two-hour radius in person, and consult remotely with clients anywhere. If you're unsure whether your location is covered, ask during your first consultation and we'll confirm right away.",
  },
];

/* palette this section is allowed to draw swatch tabs from */
export const SWATCHES = ["#ffde59", "#c9694a", "#7c8a6a", "#2b2620", "#ffde59"];
export const ROTATIONS = [-1.6, 1.1, -0.9, 1.7, -1.3];