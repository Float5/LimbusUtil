import { useEffect, useRef, useState } from "react";
import KeywordsJson from "../../data/keywords.json"
import {disassemble, getChoseong} from "es-hangul";

interface FilterData {
    filterData: {
        sinners: Array<number>,
        sins: Array<string>,
        types: Array<string>,
        seasons: Array<number>,
        grades: Array<number>,
        speedRange: Array<number>,
        keywords: Array<string>,
        searchedKeyword: string,
        searchedName: string
    },
    setFilterData: React.Dispatch<React.SetStateAction<{sinners: Array<number>,sins: Array<string>,types: Array<string>,seasons: Array<number>,grades: Array<number>,speedRange: Array<number>,keywords: Array<string>,searchedKeyword: string,searchedName: string}>>
}

const IdentityDictionaryFilter = ({filterData, setFilterData}: FilterData)=>{
    const keywordsJson: Record<string, any> = KeywordsJson;
    const [isKeywordDropdownOpen, setIsKeywordDropdownOpen] = useState(false)
    const keywordDropdownRef = useRef<HTMLDivElement | null>(null);

    const resetFilter = ()=>{
        setFilterData({...filterData, sinners:[],sins:[],types:[],seasons:[],grades:[],speedRange:[1,9],keywords:[]})
    }

    const setSearchedKeyword = (v: string)=>{
        setFilterData({...filterData, searchedKeyword:v})
    }

    const toggleSelectedSinner = (n: number)=>{
        for(let i = 0; i < filterData.sinners.length; i++){
            if(filterData.sinners[i] == n){
                setFilterData({...filterData, sinners:filterData.sinners.filter((v,index)=>{
                    if(i != index){
                        return v
                    }
                })})
                return
            }
        }
        setFilterData({...filterData, sinners:[...filterData.sinners, ...[n]]})
    }

    const toggleSelectedSin = (str: string)=>{
        for(let i = 0; i < filterData.sins.length; i++){
            if(filterData.sins[i] == str){
                setFilterData({...filterData, sins:filterData.sins.filter((v,index)=>{
                    if(i != index){
                        return v
                    }
                })})
                return
            }
        }
        setFilterData({...filterData, sins:[...filterData.sins, ...[str]]})
    }
    
    const toggleSelectedType = (str: string)=>{
        for(let i = 0; i < filterData.types.length; i++){
            if(filterData.types[i] == str){
                setFilterData({...filterData, types:filterData.types.filter((v,index)=>{
                    if(i != index){
                        return v
                    }
                })})
                return
            }
        }
        setFilterData({...filterData, types:[...filterData.types, ...[str]]})
    }

    const toggleSelectedSeason = (num: number)=>{
        for(let i = 0; i < filterData.seasons.length; i++){
            if(filterData.seasons[i] == num){
                setFilterData({...filterData, seasons:filterData.seasons.filter((v,index)=>{
                    if(i != index){
                        return v
                    }
                })})
                return
            }
        }
        setFilterData({...filterData, seasons:[...filterData.seasons, ...[num]]})
    }

    const toggleSelectedGrade = (num: number)=>{
        for(let i = 0; i < filterData.grades.length; i++){
            if(filterData.grades[i] == num){
                setFilterData({...filterData, grades:filterData.grades.filter((v,index)=>{
                    if(i != index){
                        return v
                    }
                })})
                return
            }
        }
        setFilterData({...filterData, grades:[...filterData.grades, ...[num]]})
    }

    const setSpeedRangeMin = (num: any)=>{
        setFilterData({...filterData, speedRange:[Number(num), filterData.speedRange[1]]})
    }

    const setSpeedRangeMax = (num: any)=>{
        setFilterData({...filterData, speedRange:[filterData.speedRange[0], Number(num)]})
    }



    /*useEffect(() => {
        console.log(speedRange);
    }, [speedRange]);*/


    
    const selectKeyword = (keyword: string)=>{
        for(let i = 0; i < filterData.keywords.length; i++){
            if(filterData.keywords[i] == keyword){
                return
            }
        }
        setFilterData({...filterData, keywords:[...filterData.keywords, ...[keyword]]})
    }

    const deleteKeyword = (keyword: string)=>{
        setFilterData({...filterData, keywords:filterData.keywords.filter((v)=>{
            if(v != keyword){
                return v
            }
        })})
    }

    const handleFocus = () => {
        setTimeout(() => {
            setIsKeywordDropdownOpen(true);
        }, 100);
      };

    const handleClickOutside = (event: MouseEvent) => {
        if (keywordDropdownRef.current && !keywordDropdownRef.current.contains(event.target as Node)) {
            setIsKeywordDropdownOpen(false);
        }
    };


    const compareSearchedKeyword = (keyword: string, searched: string)=>{
        keyword = keyword.split(" ").join("").split("-").join("").split(".").join("").toUpperCase().replace("EGO", "에고").replace("EG", "에고").replace("E", "에고")
        searched = searched.split(" ").join("").split("-").join("").split(".").join("").toUpperCase().replace("EGO", "에고").replace("EG", "에고").replace("E", "에고")
        let keywordDisassembled = [disassemble(keyword)]
        let searchedDisassembled = [disassemble(searched)]
        return (keyword.includes(searched) || getChoseong(keyword).includes(searched) || String(keywordDisassembled).includes(String(searchedDisassembled)))
    }


    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="idf">
            <div className="idf__background flex-column">
                <div className="idf__top flex-row">
                    <div className="idf__top__text">필터</div>
                    <div className="idf__top__resetBtn" onClick={()=>resetFilter()}>초기화</div>
                </div>
                <div className="idf__mid flex-column">
                    <div className="idf__mid__1 flex-row">
                        <div className="idf__sinner__filter flex-column">
                            <div className="idf__sinner__filter__text idf__filter__text">수감자</div>
                            <div className="idf__sinner__filterBtnFrame">
                                {[1,2,3,4,5,6,7,8,9,11,12,13].map((num: number)=>{
                                    return (
                                        <div className="idf__sinner__filterBtn idf__filterBtn" onClick={()=>toggleSelectedSinner(num)} style={(filterData.sinners.indexOf(num) != -1 ? {backgroundColor: "var(--selected_bg)", border: "1px solid var(--outline_color)"} : {})}>
                                            <img src={`/LimbusUtil/img/sinner/logo/${num}.webp`} className={`idf__sinner__filterImg idf__filterImg`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="idf__sin__filter flex-column">
                            <div className="idf__sin__filter__text idf__filter__text">죄악</div>
                            <div className="idf__sin__filterBtnFrame">
                                {["wrath", "lust", "sloth", "glut", "gloom", "pride", "envy"].map((str: string)=>{
                                    return (
                                        <div className="idf__sin__filterBtn idf__filterBtn" onClick={()=>toggleSelectedSin(str)} style={(filterData.sins.indexOf(str) != -1 ? {backgroundColor: "var(--selected_bg)", border: "1px solid var(--outline_color)"} : {})}>
                                            <img src={`/LimbusUtil/img/icon/sin/${str}.webp`} className={`idf__sin__filterImg idf__filterImg`}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="idf__type__filter flex-column">
                            <div className="idf__type__filter__text idf__filter__text">유형</div>
                            <div className="idf__type__filterBtnFrame">
                                {["slash", "penetration", "blow", "guard", "evade", "counter"].map((str: string)=>{
                                    return (
                                        <div className="idf__type__filterBtn idf__filterBtn" onClick={()=>toggleSelectedType(str)} style={(filterData.types.indexOf(str) != -1 ? {backgroundColor: "var(--selected_bg)", border: "1px solid var(--outline_color)"} : {})}>
                                            <img src={`/LimbusUtil/img/icon/${str}.webp`} className={`idf__type__filterImg idf__filterImg`}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="idf__season__filter flex-column">
                            <div className="idf__season__filter__text idf__filter__text">시즌</div>
                            <div className="idf__season__filterBtnFrame">
                                {[1,2,3,4,5].map((num: number)=>{
                                    return (
                                        <div className="idf__season__filterBtn idf__filterBtn" onClick={()=>toggleSelectedSeason(num)} style={(filterData.seasons.indexOf(num) != -1 ? {backgroundColor: "var(--selected_bg)", border: "1px solid var(--outline_color)"} : {})}>
                                            <div className={`idf__season__filterImg idf__filterImg`}>{num}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="idf__grade__filter flex-column">
                            <div className="idf__grade__filter__text idf__filter__text">등급</div>
                            <div className="idf__grade__filterBtnFrame">
                                {[1,2,3].map((num: number)=>{
                                    return (
                                        <div className="idf__grade__filterBtn idf__filterBtn" onClick={()=>toggleSelectedGrade(num)} style={(filterData.grades.indexOf(num) != -1 ? {backgroundColor: "var(--selected_bg)", border: "1px solid var(--outline_color)"} : {})}>
                                            <img src={`/LimbusUtil/img/icon/grade/${num}.webp`} className={`idf__grade__filterImg idf__filterImg`}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="idf__mid__2 flex-row">
                        <div className="idf__speed__filter flex-column">
                            <div className="idf__speed__filter__text idf__filter__text">속도</div>
                            <div className="idf__speed__filterFrame flex-row">
                                <input type="text" value={filterData.speedRange[0]} placeholder="min" defaultValue={1} className="idf__speed__filterInput idf__speed__filterInput__min" onChange={(e)=>setSpeedRangeMin(e.target.value)} />
                                <div>~</div>
                                <input type="text" value={filterData.speedRange[1]} placeholder="max" defaultValue={9} className="idf__speed__filterInput idf__speed__filterInput__max" onChange={(e)=>setSpeedRangeMax(e.target.value)} />
                            </div>
                        </div>
                        <div className="idf__keyword__filter flex-column">
                            <div className="idf__keyword__filter__text idf__filter__text">키워드</div>
                            <input list="text" placeholder="키워드" className="idf__keyword__filterInput" onFocus={()=>handleFocus()} onChange={(e)=>setSearchedKeyword(e.target.value)} />
                            <div className="idf__keyword__filter__dropdown flex-column" ref={keywordDropdownRef}>
                                {
                                    (isKeywordDropdownOpen ? Object.keys(KeywordsJson).map((keyword)=>{
                                        return (
                                            ((filterData.searchedKeyword == "" || compareSearchedKeyword(keyword, filterData.searchedKeyword)) ? <div onClick={()=>selectKeyword(keyword)} className="idf__keyword__filter__dropdown__option">{keyword}</div> : "")
                                        )
                                    }) : "")
                                }
                            </div>
                            <div className="idf__keyword__filtered__list flex-row">
                                {
                                    filterData.keywords.map((keyword)=>{
                                        return(
                                            <div className="idf__keyword__filtered" onClick={()=>deleteKeyword(keyword)}>
                                                {keyword}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}




export default IdentityDictionaryFilter