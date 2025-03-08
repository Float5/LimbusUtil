import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IdentityJson from "../../data/identity.json"
import Header from 'limbus/Header';
import IdentityInformationProfile from './IdentityInformationProfile';
import IdentityInformationTabs from './IdentityInformationTabs';
import IdentityInformationInfos from './IdentityInformationInfos'
import { Helmet } from 'react-helmet-async';

const IdentityInformation = () => {
  const { index } = useParams<{index:string}>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(index){
    return (
      <>
      <Helmet>
        <title>짭빵숲 - 인격 정보</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
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