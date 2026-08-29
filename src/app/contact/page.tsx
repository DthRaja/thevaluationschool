import React from "react";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";

import ContactForm, { type ICountryCodeOption } from "./Components/ContactForm";

const ContactPage = async () => {
  const countryCodeApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 42 });
  const countryCodeRes = await countryCodeApi.request();
  const countryCodes: ICountryCodeOption[] = convertData(countryCodeRes?.result) || [];

  return <ContactForm countryCodes={countryCodes} />;
};

export default ContactPage;
