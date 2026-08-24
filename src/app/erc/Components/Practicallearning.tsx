import LearningSlider, {
  LearningSliderCard,
} from "@/app/Components/Shared/LearningSlider";

const learningCards: LearningSliderCard[] = [
  {
    title: "Case-Based Company Analysis",
    description:
      " Work on live companies and apply concepts through detailed case studies instead of theory.",
    image: "/img/Fundamental Analysis.png",
  },
  {
    title: "Red Flag Detection Practice",
    description:
      "Spot revenue manipulation, cash flow mismatches, and governance loopholes using real-world data.",
    image: "/img/Red Flag Analysis.png",
  },
  {
    title: "Concall &amp; Annual Report Notes",
    description:
      "Learn how to extract key insights from management calls and annual reports — and turn them into usable notes.",
    image: "/img/Real-life Examples.png",
  },
  {
    title: "End-to-End Equity Report",
    description:
      "Build and present a complete equity research report that showcases your analysis and findings.",
    image: "/img/Report Writing.png",
  },
];

export const Practicallearning = () => (
  <LearningSlider
    title="Move for Practical learning"
    description=" This program is designed to make you think like an equity analyst, not
        just a student. Each module trains you to apply real-world tools and
        frameworks on companies, sectors, and markets like an Equity Research 
        Analyst."
    cards={learningCards}
  />
);

export default Practicallearning;
