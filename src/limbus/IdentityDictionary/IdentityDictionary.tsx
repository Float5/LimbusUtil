import Header from 'limbus/Header';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import IdentityDictionaryFilter from './IdentityDictionaryFilter';
import IdentityDictionaryList from './IdentityDictionaryList';

interface FilterData{
  sinners: Array<number>,
  sins: Array<string>,
  types: Array<string>,
  seasons: Array<number>,
  grades: Array<number>,
  speedRange: Array<number>,
  keywords: Array<string>,
  searchedKeyword: string,
  searchedName: string
}

const IdentityDictionary = () => {
  const [filterData, setFilterData] = useState<FilterData>(()=>{
    const savedFilterData = sessionStorage.getItem("filterData")
    if(savedFilterData !== null){ 
      return JSON.parse(savedFilterData)
    }
    return {
      sinners: [],
      sins: [],
      types: [],
      seasons: [],
      grades: [],
      speedRange: [1,9],
      keywords: [],
      searchedKeyword: "",
      searchedName: ""
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("filterData", JSON.stringify(filterData));
  }, [filterData]);


  return (
    <>
    <Helmet>
      <title>짭빵숲 - 인격 사전</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    </Helmet>
    <Header />
    <main className='id__main'>
      <IdentityDictionaryFilter filterData={filterData} setFilterData={setFilterData} />
      <IdentityDictionaryList filterData={filterData} setFilterData={setFilterData} />
    </main>
    </>
  )
}

export default IdentityDictionary;