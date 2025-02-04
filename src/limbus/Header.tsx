import { Link } from "react-router-dom";

const Header = ()=>{
    return (
        <header>
            <div className="header__inner">
                <div className="header__logo">
                    <Link to="/" className="auto-fit-text">짭빵숲</Link>
                </div>
                <div className="header__tabs">
                    <Link to="/identity/" className="auto-fit-text">인격 사전</Link>
                    <Link to="/identity/" className="auto-fit-text">인격 사전</Link>
                    <Link to="/identity/" className="auto-fit-text">인격 사전</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;