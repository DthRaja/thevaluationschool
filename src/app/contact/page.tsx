import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import type { Metadata } from "next";

import { getOrigin } from "@/app/lib/getOrigin";
import ContactForm, { type ICountryCodeOption } from "./Components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact The Valuation School | Get in Touch with Team The Valuation School",
    description:
      "Have a question or need guidance? Contact The Valuation School for course queries, payments, partnerships, or general support. We're here to help you move forward.",
    alternates: {
      canonical: new URL(await getOrigin("/contact")),
    },
  };
}

const ContactPage = async () => {
  const countryCodeApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 42 });
  const countryCodeRes = await countryCodeApi.request();
  const countryCodes: ICountryCodeOption[] = convertData(countryCodeRes?.result) || [];

  return <ContactForm countryCodes={countryCodes} />;
};

export default ContactPage;
