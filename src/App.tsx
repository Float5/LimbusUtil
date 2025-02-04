import IdentityInformation from "./limbus/IdentityDictionary/IdentityInformation";
import IdentityDictionary from "./limbus/IdentityDictionary/IdentityDictionary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <>
    <Routes>
      <Route path="identity/" element={<IdentityDictionary />} />
      <Route path="identity/:index" element={<IdentityInformation />} />
    </Routes>
    </>
  );
}

export default App;
