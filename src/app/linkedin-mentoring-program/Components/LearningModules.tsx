import React from "react";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import LearningModulesClient from "./LearningModulesClient";

export interface ILearningModule {
  number: string;
  label: string;
  answerHtml: string;
}

export interface ICountryCodeOption {
  label: string;
}

export interface ICountryOption {
  label: string;
  StdFormat: string;
}

interface ILearningModuleApiItem {
  FaqQuestions?: string;
  FaqAnswer?: string;
}

interface ILearningModuleApiResponse {
  LearningModule?: {
    ListData?: ILearningModuleApiItem[];
  };
}

interface LearningModulesProps {
  courseId?: number;
  demoVideoLink?: string;
}

const LearningModules = async ({ courseId, demoVideoLink }: LearningModulesProps) => {
  const modulesApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 52 });
  const countryCodeApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 42 });
  const countryApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 12 });

  const [modulesRes, countryCodeRes, countryRes] = await Promise.all([
    modulesApi.request({
      UniqueTable: "tblcourse",
      UniqueTable_Pk: "10145",
    }),
    countryCodeApi.request(),
    countryApi.request(),
  ]);

  const modulesParsed: ILearningModuleApiResponse =
    convertData(modulesRes?.result) || {};
  const rawModules = modulesParsed?.LearningModule?.ListData ?? [];

  const modules: ILearningModule[] = rawModules.map((item) => {
    const parts = (item.FaqQuestions ?? "").trim().split(/\s+/).filter(Boolean);
    const [number, ...rest] = parts;

    return {
      number: number ?? "",
      label: rest.join(" "),
      answerHtml: item.FaqAnswer ?? "",
    };
  });

  const countryCodes: ICountryCodeOption[] = convertData(countryCodeRes?.result) || [];
  const countries: ICountryOption[] = convertData(countryRes?.result) || [];

  return (
    <LearningModulesClient
      modules={modules}
      countryCodes={countryCodes}
      countries={countries}
      demoVideoLink={demoVideoLink}
    />
  );
};

export default LearningModules;
