import { Home } from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadImagePage from "./pages/UploadImagePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/uploadImage" element={<UploadImagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
