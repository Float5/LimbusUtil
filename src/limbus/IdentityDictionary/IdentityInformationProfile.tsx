import IdentityJson from "../../data/identity.json"


type IdentityInformationProfileProps = {
    index: number;
}

const IdentityDictionaryInformation = ({index}: IdentityInformationProfileProps)=>{
    const identityJson: Record<string, any> = IdentityJson;

    return (
        <div className="iip__profile">
            <div className="iip__profile__left iip__profile__lr">
              <div className="iip__identityName">
                <img src={`/img/sinner/logo/${identityJson[index].sinnerNumber}.webp`} alt="" className='iip__identityName__logo'/>
                <div className={`iip__identityName__name auto-fit-text ${identityJson[index].sinnerName}-color`}>
                  {`[${identityJson[index].identityName}] ${identityJson[index].sinnerName}`}
                </div>
              </div>
              <div className="iip__identityDescriptionContainer">
                <div className={`iip__identityDescription auto-fit-text ${identityJson[index].sinnerName}-color`}>
                  "{identityJson[index].identityDescription}"
                </div>
              </div>
              <img src={`/img/identity/before/${index}.webp`} alt="" className='iip__identityImg'/>
              <img src={`/img/identity/after/${index}.webp`} alt="" className='iip__identityImg'/>
            </div>
            <div className="iip__profile__right iip__profile__lr">
              <div className="iip__grade">
                <img src={`/img/icon/grade/${identityJson[index].grade}.webp`} className="iip__gradeImg" />
              </div>
              <div className="iip__status">
                <div className="iip__status__health iip__status__ auto-fit-text"><img src="/img/icon/health.webp" className='iip__statusIcon' />{identityJson[index].health}</div>
                <div className="iip__status__speed iip__status__ auto-fit-text"><img src="/img/icon/speed.webp" className='iip__statusIcon' />{identityJson[index].speed}</div>
                <div className="iip__status__defense iip__status__ auto-fit-text"><img src="/img/icon/defense.webp" className='iip__statusIcon' />{`${identityJson[index].defense}(${(identityJson[index].defense > 50 ? "+" : "")}${identityJson[index].defense - 50})`}</div>
              </div>
              <div className="iip__resistances">
                <div className={`iip__resistances__slash iip__resistances__ auto-fit-text iip__${identityJson[index].resistances.slash}`}><img src="/img/icon/slash.webp" className='iip__resistanceIcon' />{identityJson[index].resistances.slash}</div>
                <div className={`iip__resistances__penetration iip__resistances__ auto-fit-text iip__${identityJson[index].resistances.penetration}`}><img src="/img/icon/penetration.webp" className='iip__resistanceIcon' />{identityJson[index].resistances.penetration}</div>
                <div className={`iip__resistances__blow iip__resistances__ auto-fit-text iip__${identityJson[index].resistances.blow}`}><img src="/img/icon/blow.webp" className='iip__resistanceIcon' />{identityJson[index].resistances.blow}</div>
              </div>
              <div className='iip__struggle iip__details'>흐트러짐 구간: <div className='iip__struggleValue iip__detailsValue auto-fit-text'>{identityJson[index].struggle}</div></div>
              <div className='iip__season iip__details'>시즌: <div className='iip__seasonValue iip__detailsValue auto-fit-text'>{identityJson[index].season}</div></div>
              <div className='iip__belong iip__details'>소속: <div className='iip__belongValue iip__detailsValue auto-fit-text'>{identityJson[index].belong}</div></div>
              <div className='iip__release iip__details'>출시시기: <div className='iip__releaseValue iip__detailsValue auto-fit-text'>{identityJson[index].release}</div></div>
              <div className='iip__way iip__details'><div className='iip__wayValue iip__detailsValue auto-fit-text'>{identityJson[index].way}</div></div>
            </div>
        </div>
    )
}

export default IdentityDictionaryInformation;