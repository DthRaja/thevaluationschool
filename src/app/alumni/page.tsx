import React from 'react'
import type { Metadata } from 'next'
import Banner from './Components/Banner'
import ServerApi from '@/utils/Server';
import Companies from './Components/Companies';
import convertData from '@/utils/convartData';
import ReviewAlumni from './Components/ReviewAlumni';
import ReviewForm from './Components/ReviewForm';

export const metadata: Metadata = {
  title: 'The Valuation School Alumni | Success Stories & Career Journeys of Our Students',
  description:
    'Explore the success stories of The Valuation School alumni. See how students transformed learning into real finance careers through mentorship, practical skills, and focused guidance.',
  alternates: {
    canonical: '/alumni',
  },
};

export default async function Alumni() {
    const CompaniesApi = new ServerApi({
      withAuth: false,
      spName: "SPClientAnonymous",
      mode: 57,
    });

    const [companiesJson ] = 
    await Promise.all([
      CompaniesApi.request({
        GroupName: "Companies where our students are placed",
        PageId: 16,
      })
    ])

    const companiesData = convertData(companiesJson?.result) || [];
    console.log(companiesData)
  return (
    <>
    <Banner/>
    <Companies data={companiesData}/>
    <ReviewAlumni />
    <ReviewForm />
    </>
  )
}