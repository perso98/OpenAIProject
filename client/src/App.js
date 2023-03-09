import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import PhotoGeneratorPage from "./pages/PhotoGeneratorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PicturesPage from "./pages/PicturesPage";
import AuthProvider from "./providers/AuthProvider ";
import ProtectedRoute from "./protected-routes/ProtectedRoute";
import UserRoute from "./protected-routes/UserRoute";
import FavoritesPage from "./pages/FavoritesPage";
import Top20Page from "./pages/Top20Page";
import UserPicturesPage from "./pages/UserPicturesPage";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<PicturesPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/photo-generator" element={<PhotoGeneratorPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/user-pictures" element={<UserPicturesPage />} />
            </Route>
            <Route path="/top" element={<Top20Page />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route element={<UserRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
