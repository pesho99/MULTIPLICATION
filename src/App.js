import Multiplication from "./Games/Multiplication";
import Header from "./Components/Header";
import Generation from "./Games/Generation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="generation" element={<Generation/>}/>
        <Route path="multiplication" element={<Multiplication/>}/>
      </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
