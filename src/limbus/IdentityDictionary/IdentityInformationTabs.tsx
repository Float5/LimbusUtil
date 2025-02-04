import { click } from "@testing-library/user-event/dist/click";
import IdentityJson from "../../data/identity.json"


type IdentityInformationTabsProps = {
    index: number;
}

const IdentityDictionaryTabs = ({index}: IdentityInformationTabsProps)=>{
    const identityJson: Record<string, any> = IdentityJson;

    const scrollToElement = (selector: string) => {
        const element = document.querySelector(selector);
        if (element) {
            const rect = element.getBoundingClientRect();
            window.scrollTo({
                top: window.scrollY + rect.top,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="iit__tabs">
            <div className="iit__tab" onClick={()=>scrollToElement(".section__ii__skill")}>스킬</div>
            <div className="iit__tab" onClick={()=>scrollToElement(".section__ii__passive")}>패시브</div>
            <div className="iit__tab" onClick={()=>scrollToElement(".section__ii__keyword")}>키워드</div>
        </div>
    )
}

export default IdentityDictionaryTabs;