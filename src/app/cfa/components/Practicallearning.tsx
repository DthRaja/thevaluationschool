import LearningSlider, {
  LearningSliderCard,
} from "@/app/Components/Shared/LearningSlider";

const learningCards: LearningSliderCard[] = [
  {
    title: "Simple Explanations",
    description:
      " CFA® concepts broken down into plain, everyday hindi language.",
    image: "/img/WHY 1.png",
  },
  {
    title: "Ready-to-Use Prep Tools",
    description:
      "MCQs, revision classes, and detailed notes included.",
    image: "/img/WHY 2.png",
  },
  {
    title: "Learn from Real Companies",
    description:
      "Learn by linking theory to companies, markets, and live case studies.",
    image: "/img/Case study.png",
  },
  {
    title: "Report Making",
    description:
      "Apply concepts directly in Excel, PowerPoint, and real financial data.",
    image: "/img/Learning.png",
  },
    {
    title: "Active Community",
    description:
      "Get doubt support, peer discussion, and mentor guidance in our forum.",
    image: "/img/Community.png",
  },
    {
    title: "Complete Coverage",
    description:
      "From recorded lectures to practical practice, everything is included in one package.",
    image: "/img/complete.png",
  },
];

export const Practicallearning = () => (
  <LearningSlider
    title="Why choose us?"
    description="Choosing the right CFA® prep partner can make or break your journey. At
        The Valuation School, we focus on clarity, practicality, and mentorship
        ,so you don’t just study for the exam, you learn to think like a finance
        professional."
    cards={learningCards}
  />
);

export default Practicallearning;
