import { Home } from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { getFoodPrint, getFoodVisorData } from "./api/utils";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // getFoodPrint().then((d)=>{
    //   console.log(d);
    // });

    getFoodVisorData().then((d) => {
      console.log(d);
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
