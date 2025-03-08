
import IdentityJson from "../../data/identity.json"
import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
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

const IdentityDictionaryList = ({filterData, setFilterData}: FilterData)=>{
    const identityJson: Record<string, any> = IdentityJson;
    let [isUptie, setUptie] = useState(false)
    const navigate = useNavigate()
    
    const toggleUptie = ()=>{
        setUptie(!isUptie)
    }

    const setSearchedName = (v: string)=>{
        setFilterData({...filterData, searchedName:v})
    }

    return (
        <div className="idl flex-column">
            <input list="text" placeholder="검색" className="idl__name__input" onChange={(e)=>setSearchedName(e.target.value)} />
            <div className="iis__uptie" onClick={toggleUptie}><div>4동기화</div> {!isUptie ? <FaRegCircle /> : <FaCircleCheck />}</div>
            <div className="idl__list">
                {Array.from({ length: 130 }, (_, i) => i + 1).map((v)=>{
                    return (makeProfileHTML(v, {filterData, setFilterData}, identityJson, isUptie, navigate))
                })}
            </div>
        </div>
    )
}


const makeProfileHTML = (v: number, {filterData, setFilterData}: FilterData, identityJson: any, isUptie: any, navigate: any)=>{
    const identityInfo = identityJson[String(v)]
    const navigateToIdentityInfo = (v: number) => {
        navigate(`/identity/${v}`);
    };

    const compareSearchedName = (searched: string)=>{
        const sinnerName = identityInfo.sinnerName
        const identityName = identityInfo.identityName

        let names: Array<string> = [sinnerName, identityName, sinnerName+identityName, identityName+sinnerName]

        for(let i = 0; i < identityInfo.nick.length; i++){
            names.push(identityInfo.nick[i]+identityInfo.sinnerName)
            if(identityInfo.sinnerName == "이상"){
                names.push(identityInfo.nick[i]+"상")
            }
            if(identityInfo.sinnerName == "료슈"){
                names.push(identityInfo.nick[i]+"슈")
            }
            if(identityInfo.sinnerName == "홍루"){
                names.push(identityInfo.nick[i]+"루")
            }
            if(identityInfo.sinnerName == "이스마엘"){
                names.push(identityInfo.nick[i]+"마엘")
                names.push(identityInfo.nick[i]+"스마엘")
            }
            if(identityInfo.sinnerName == "오티스"){
                names.push(identityInfo.nick[i]+"티스")
            }
            if(identityInfo.sinnerName == "그레고르"){
                names.push(identityInfo.nick[i]+"그렉")
            }
        }

        let flag = false
        for(let i = 0; i < names.length; i++){
            names[i] = names[i].split(" ").join("").split(".").join("").split(":").join("").toUpperCase().replace("EGO", "에고").replace("EG", "에고").replace("E", "에고")
            searched = searched.split(" ").join("").split(".").join("").split(":").join("").toUpperCase().replace("EGO", "에고").replace("EG", "에고").replace("E", "에고")
            let nameDisassembled = [disassemble(names[i])]
            let searchedDisassembled = [disassemble(searched)]
            flag = (names[i].includes(searched) || getChoseong(names[i]).includes(searched) || String(nameDisassembled).includes(String(searchedDisassembled)))
            if(flag){
                break
            }
        }
        return flag
    }

    if(filterData.sinners.length != 0 && filterData.sinners.indexOf(identityInfo.sinnerNumber) == -1){
        return
    }
    
    if(filterData.sins.length != 0){
        let flag = true
        for(let i = 0; i < identityInfo.after4Uptie.skills.length; i++){
            if(filterData.sins.indexOf(identityInfo.after4Uptie.skills[i].sin) != -1){
                flag = false
            }
        }
        if(flag){
            return
        }
    }

    if(filterData.types.length != 0){
        let flag = true
        for(let i = 0; i < identityInfo.after4Uptie.skills.length; i++){
            if(filterData.types.indexOf(identityInfo.after4Uptie.skills[i].type) != -1){
                flag = false
            }
        }
        for(let i = 0; i < identityInfo.after4Uptie.skills.length; i++){
            if(filterData.types.indexOf((identityInfo.after4Uptie.skills[i].skill).toLowerCase()) != -1){
                flag = false
            }
        }
        if(flag){
            return
        }
    }

    if(filterData.seasons.length != 0 && filterData.seasons.indexOf(identityInfo.season) == -1){
        return
    }

    if(filterData.grades.length != 0 && filterData.grades.indexOf(identityInfo.grade) == -1){
        return
    }

    if(filterData.speedRange[0] > Number(identityInfo.speed[0]) || filterData.speedRange[1] < Number(identityInfo.speed[2])){
        return
    }

    if(filterData.keywords.length != 0){
        let flag = 0
        for(let i = 0; i < identityInfo.keywords.length; i++){
            if(filterData.keywords.indexOf(identityInfo.keywords[i]) != -1){
                flag++
            }
        }
        if(flag != filterData.keywords.length){
            return
        }
    }

    if(filterData.searchedName != ""){
        if(!compareSearchedName(filterData.searchedName)){
            return
        }
    }

    return (
        <div className="idl__profile flex-column" onClick={()=>navigateToIdentityInfo(v)}>
            <div className="idl__profile__label flex-row">
                <img src={`/LimbusUtil/img/icon/grade/${identityInfo.grade}.webp`} className="idl__profile__grade" />
                <div className="idl__profile__name flex-column">
                    <div className="idl__profile__identity__name">
                        {identityInfo.identityName}
                    </div>
                    <div className="idl__profile__sinner__name">
                        {identityInfo.sinnerName}
                    </div>
                </div>
            </div>
            <img src={`/LimbusUtil/img/identity/${(isUptie ? "after" : "before")}/${v}.webp`} className="idl__profile__img" />
        </div>
    )
}




export default IdentityDictionaryList