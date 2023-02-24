import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import PhotoGeneratorPage from "./pages/PhotoGeneratorPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/photogenerator" element={<PhotoGeneratorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
