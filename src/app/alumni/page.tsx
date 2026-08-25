import React from 'react'
import Banner from './Components/Banner'
import ServerApi from '@/utils/Server';
import Companies from './Components/Companies';
import convertData from '@/utils/convartData';
import ReviewAlumni from './Components/ReviewAlumni';

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
    </>
  )
}