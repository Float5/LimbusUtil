import React, {useState} from 'react';

import IdentityJson from "../../data/identity.json";
import KeywordsJson from "../../data/keywords.json"
import KeywordsKrToEngJson from "../../data/keywordsKrToEng.json"
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

type IdentityInformationInfosProps = {
    index: number;
}

const IdentityInformationInfos = ({index}: IdentityInformationInfosProps)=>{
    const identityJson: Record<string, any> = IdentityJson;
    let [isUptie, setUptie] = useState(false)

    const toggleUptie = ()=>{
        setUptie(!isUptie)
    }

    return (
        <div className="iis__main">
            <div className="iis__uptie" onClick={toggleUptie}><div>4동기화</div> {!isUptie ? <FaRegCircle /> : <FaCircleCheck />}</div>

            <div className="iis__tabs flex-column">
                <div className="iis__skills section__ii__skill">
                    {identityJson[index][(!isUptie ? "before4Uptie" : "after4Uptie")].skills.map((skillInfo: any) =>(
                        makeSkillInfoHTML(skillInfo)
                    ))}
                </div>
                <div className="iis__passives section__ii__passive">
                    {identityJson[index].passives.map((passiveInfo: any) =>(
                        makePassiveInfoHTML(passiveInfo)
                    ))}
                </div>
                <div className="iis__keywords section__ii__keyword">
                    {identityJson[index].keywords.map((keywordInfo: any) =>(
                        makeKeywordInfoHTML(keywordInfo)
                    ))}
                </div>
            </div>
        </div>
    )
}

const makeSkillInfoHTML = (SkillInfo: any)=>{
    return (
        <div className="iis__skill">
            <div className="iis__skill__up">
                {makeSkillNameHTML(SkillInfo)}
                {makeCoinsHTML(SkillInfo.coins)}
                {makeWeightsHTML(SkillInfo.weight)}
                {makeLvHTML(SkillInfo.Lv, SkillInfo.type)}
                {makePowerHTML(SkillInfo.skillPower, SkillInfo.coinPower)}
            </div>
            <div className="iis__skill__under">
                {makeSkillDescriptionHTML(SkillInfo.description)}
            </div>
        </div>
    )
}

const makePassiveInfoHTML = (PassiveInfo: any)=>{
    return (
        <div className="iis__passive">
            <div className="iis__passive__up">
                {makePassiveNameHTML(PassiveInfo)}
            </div>
            <div className="iis__passive__under">
                {makePassiveDescriptionHTML(PassiveInfo.description)}
            </div>
        </div>
    )
}

const makeKeywordInfoHTML = (KeywordInfo: any)=>{
    return (
        <div className="iis__keyword">
            <div className="iis__keyword__up">
                {makeKeywordNameHTML(KeywordInfo)}
            </div>
            <div className="iis__keyword__under">
                {makeKeywordDescriptionHTML(KeywordInfo)}
            </div>
        </div>
    )
}

const makeSkillNameHTML = (SkillInfo: any)=>{
    return (
        <div className="iis__skill__name">
            {(SkillInfo.sin == "none" ? "" : <img src={`/img/icon/sin/${SkillInfo.sin}.webp`} className={`iis__skill__sin iis__skill__${SkillInfo.sin}`} />)}
            <div className={`${SkillInfo.sin}-color`}>{SkillInfo.skill}</div>
            <div>{SkillInfo.skillName}</div>
            {(SkillInfo.type == "none" ? "" : <img src={`/img/icon/${SkillInfo.type}.webp`} className={`iis__skill__type iis__skill__${SkillInfo.type}`} />)}
        </div>
    )
}

const makePassiveNameHTML = (PassiveInfo: any)=>{
    return (
        <div className="iis__passive__name">
            <div className={`${PassiveInfo.sin}-color`}>{PassiveInfo.skill}</div>
            <div>{PassiveInfo.skillName}</div>
            {(PassiveInfo.sin == "none" ? "" : <img src={`/img/icon/sin/${PassiveInfo.sin}.webp`} className={`iis__passive__sin iis__passive__${PassiveInfo.sin}`} />)}
            <div>{(PassiveInfo.sin == "none" ? "" : "X")}</div>
            <div>{(PassiveInfo.sin == "none" ? "" : PassiveInfo.count)}</div>
            <div>{(PassiveInfo.sin == "none" ? "" : PassiveInfo.type)}</div>
        </div>
    )
}

const makeKeywordNameHTML = (KeywordInfo: any)=>{
    const keywordsKrToEngJson: Record<string, any> = KeywordsKrToEngJson;
    return (
        <div className="iis__keyword__name">
            <img src={`/img/icon/keyword/${keywordsKrToEngJson[KeywordInfo]}.webp`} className="iis__keyword__img" />
            <div>{KeywordInfo}</div>
        </div>
    )
}

const makeCoinsHTML = (coins: any)=>{
    return (
        <div className="iis__skill__coins">
            {coins.map((v: boolean)=>(
                (v ? <img src="/img/icon/coin.webp" className="iis__skill__coin" /> : <img src="/img/icon/redcoin.webp" className="iis__skill__coin" />)
            ))}
        </div>
    )
}   

const makeWeightsHTML = (weight: any)=>{
    return (
        <div className="iis__skill__weights">
            <div className="iis__skill__weightText">
                가중치
            </div>
            {Array.from({ length: weight }, (_, i) => (
                <div className="iis__skill__weight"></div>
            ))}
        </div>
    )
}

const makeLvHTML = (Lv: any, type: any)=>{
    return (
        <div className="iis__skill__Lv">
            <div className="iis__skill__LvText">
                {(type == "none" ? "방어 레벨" : "공격 레벨")}
            </div>
            <div className="iis__skill__LvIcon">
                {(type == "none" ? <img src="/img/icon/adLevel/defense.webp" className="iis__skill__LvIcon__Icon" /> : <img src="/img/icon/adLevel/attack.webp" className="iis__skill__LvIcon__Icon" />)}
            </div>
            <div className="iis__skill__LvValue">
                {`${Lv}(${Lv > 50 ? "+" : ""}${Lv-50})`}
            </div>
        </div>
    )
}

const makePowerHTML = (skillPower: any, coinPower: any)=>{
    return (
        <div className="iis__skill__Power flex-row">
            <div className="iis__skill__skillPower flex-row">
                <div className="iis__skill__skillPowerText">
                    스킬 위력
                </div>
                <div className="iis__skill__skillPowerValue">
                    {skillPower}
                </div>
            </div>
            <div className="iis__skill__coinPower flex-row">
                <div className="iis__skill__coinPowerText">
                    코인 위력
                </div>
                <div className="iis__skill__coinPowerValue">
                    {coinPower}
                </div>
            </div>
        </div>
    )
}

const makeSkillDescriptionHTML = (skillDescription: any)=>{
    var BA = []
    var AA = []

    for(let i = 0; i < skillDescription.beforeAttack.length; i++){
        BA.push(splitSkillDescription(skillDescription.beforeAttack[i]))
    }

    for(let i = 0; i < skillDescription.afterAttack.length; i++){
        var AA_ = []
        for(let j = 0; j < skillDescription.afterAttack[i].length; j++){
            AA_.push(splitSkillDescription(skillDescription.afterAttack[i][j]))
        }
        AA.push(AA_)
    }

    return (
        <div className='iis__skill__desc flex-column'>
            <div className="iis__skill__desc__before">
                {BA.map((v)=>(
                    <div className="iis__skill__desc__line">
                        {v.map((text)=>(
                            makeDescriptionTextHTML(text)
                        ))}
                    </div>
                ))}
            </div>
            <div className="iis__skill__desc__after flex-column">
                {AA.map((v1, i)=>{
                    if(v1.length == 0){
                        return (
                            <div></div>
                        )
                    }
                    return (
                        <div className="iis__skill__desc__withCoin flex-row">
                            <img src={`/img/icon/coinnumber/${i+1}.webp`} className="iis__skill__desc__coin" />
                            <div className="iis__skill__desc__afterText flex-column">
                                {v1.map((v2)=>{
                                    return (
                                        <div className="iis__skill__desc__line">
                                            {v2.map((v3)=>(
                                                makeDescriptionTextHTML(v3)
                                            ))}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const makePassiveDescriptionHTML = (passiveDescription: any)=>{
    const arr = []

    for(let i = 0; i < passiveDescription.length; i++){
        arr.push(splitSkillDescription(passiveDescription[i]))
    }

    return (
        <div className='iis__passive__desc flex-column'>
            <div className="iis__passive__desc__before">
                {arr.map((v)=>{
                    return (
                        <div className="iis__passive__desc__line">
                            {v.map((v2)=>(
                                makeDescriptionTextHTML(v2)
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const makeKeywordDescriptionHTML = (keywordDescription: any)=>{
    const keywordsJson: Record<string, any> = KeywordsJson;
    const arr = []

    for(let i = 0; i < keywordsJson[keywordDescription].length; i++){
        arr.push(splitSkillDescription(keywordsJson[keywordDescription][i]))
    }

    console.log(keywordDescription)

    return (
        <div className='iis__keyword__desc flex-column'>
            <div className="iis__keyword__desc__before">
                {arr.map((v)=>{
                    return (
                        <div className="iis__keyword__desc__line">
                            {v.map((v2)=>(
                                makeDescriptionTextHTML(v2)
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const makeDescriptionTextHTML = (text: any)=>{
    var descTextClass = ""
    var isSpecial = false
    if(text[0] == "["){
        descTextClass = "iis__descText__when"
    }else if(text[0] == "<"){
        descTextClass = "iis__descText__keyword"
        isSpecial = true
    }else{
        descTextClass = "iis__descText__text"
    }


    return (
        <span className={`iis__descText ${descTextClass}`}>
            {(isSpecial ? text.slice(1, text.length - 1) : text)}
        </span>
    )
}


export default IdentityInformationInfos





const splitSkillDescription = (input: string)=>{
    const regex = /([^\[\]<]+|\[[^\]]+\]|<[^>]+>)/g;
    const matches = input.match(regex);
    
    if (!matches) return [];

    const result = matches.reduce((acc: string[], curr: string) => {
        if (curr.startsWith('[') || curr.startsWith('<')) {
            acc.push(curr);
        } else {
            acc.push(...curr.split(/\s+/));
        }
        return acc;
    }, []);

    return result;
}