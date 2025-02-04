import React from 'react';
import { useParams } from 'react-router-dom';
import IdentityJson from "../../data/identity.json"
import Header from 'limbus/Header';
import IdentityInformationProfile from './IdentityInformationProfile';
import IdentityInformationTabs from './IdentityInformationTabs';
import IdentityInformationInfos from './IdentityInformationInfos'
import { Helmet } from 'react-helmet-async';

const IdentityInformation = () => {
  const { index } = useParams<{index:string}>();

  if(index){
    return (
      <>
      <Helmet>
        <title>짭빵숲</title>
      </Helmet>
      <Header />
      <main className='ii__main'>
        <IdentityInformationProfile index={parseInt(index)} />
        <IdentityInformationTabs index={parseInt(index)} />
        <IdentityInformationInfos index={parseInt(index)} />
      </main>
      </>
    )
  }


  return (
    <div></div>
  )
}

export default IdentityInformation;