import LearningSlider, {
  LearningSliderCard,
} from "@/app/Components/Shared/LearningSlider";

const learningCards: LearningSliderCard[] = [
  {
    title: "Case Study Driven",
    description:
      "Work on real companies and case studies to see how finance concepts apply in the real world.",
    image: "/img/Fundamental Analysis.png",
  },
  {
    title: "Interview Prep Classes",
    description:
      "Get ready for core finance interviews with technical Q&As, resume tips, and confidence-building guidance.",
    image: "/img/Real-World Valuation.png",
  },
  {
    title: "Forecasting in Excel",
    description:
      "Master Excel tools to project revenues, costs, and cash flows — the backbone of financial modeling.",
    image: "/img/Forecasting Future Growth.png",
  },
  {
    title: "Report Making",
    description:
      "Create professional valuation reports that present analysis clearly, just like analysts in top firms.",
    image: "/img/Report Writing.png",
  },
];

export const Practicallearning = () => (
  <LearningSlider
    title="Move for Practical learning"
    description="This program is built on learning by doing & not just theory. Every module focuses on practical tasks that mirror what real finance professionals work on."
    cards={learningCards}
  />
);

export default Practicallearning;
