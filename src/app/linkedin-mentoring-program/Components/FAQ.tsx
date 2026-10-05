import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";import DropMessageButton from "@/app/Components/layout/DropMessageButton";
import Image from "next/image";
import FAQAccordion from "./FAQAccordion";

export interface IFaqItem {
  FaqQuestions: string;
  FaqAnswer: string;
}

interface IFaqApiResponse {
  FAQ?: {
    ListData?: IFaqItem[];
  };
}

interface FAQProps {
  courseId?: number;
}

const FAQ = async ({ courseId }: FAQProps) => {
  const faqApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 52 });
  const faqRes = await faqApi.request({
    UniqueTable: "tblcourse",
    UniqueTable_Pk: courseId ? String(courseId) : "",
  });

  const faqParsed: IFaqApiResponse = convertData(faqRes?.result) || {};
  const faqs: IFaqItem[] = faqParsed?.FAQ?.ListData ?? [];

  return (
    <div className="frequently-asked-questions-section">
      <div className="container">
        <div className="frequently-asked-questions-header">
          <h3>Frequently asked questions</h3>
        </div>
        <div className="frequently-asked-questions-container">
          {faqs.length > 0 ? (
            <FAQAccordion faqs={faqs} />
          ) : (
            <div className="questions" id="questionsAns">
              <p>No FAQs available at the moment.</p>
            </div>
          )}

          <div className="have-a-question">
            <div className="have-a-question-content">
              <Image
                src="/img/have-a-question.svg"
                alt="have-a-question-icon"
                width={74}
                height={74}
              />
              <h3>Do you have any more question?</h3>
              <p>Please drop us a message here to help us resolve it.</p>
            </div>
            <DropMessageButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
