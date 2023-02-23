import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import Navbar from "./components/Navbar/Navbar";
import { loadFromLocalStorage } from "./hooks/useSaveAndLoadLocalStorage";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { loginUser } from "./redux/userSlice";

function App() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localFirebaseData = loadFromLocalStorage();
    if (localFirebaseData && !user.isLoggedIn) {
      dispatch(loginUser(localFirebaseData));
    }
  }, [dispatch, user.isLoggedIn]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
