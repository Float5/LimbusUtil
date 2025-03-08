import IdentityInformation from "./limbus/IdentityDictionary/IdentityInformation";
import IdentityDictionary from "./limbus/IdentityDictionary/IdentityDictionary";
import { Routes, Route } from "react-router-dom";
import Header from "limbus/Header";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="identity/" element={<IdentityDictionary />} />
      <Route path="identity/:index" element={<IdentityInformation />} />
    </Routes>
    </>
  );
}

export default App;
