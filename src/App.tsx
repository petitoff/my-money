import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
  }, [user.isLoggedIn]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              !user.isLoggedIn ? <Navigate replace to="/login" /> : <HomePage />
            }
          />
          <Route
            path="/login"
            element={
              user.isLoggedIn ? <Navigate replace to="/" /> : <LoginPage />
            }
          />
          <Route
            path="/signup"
            element={
              user.isLoggedIn ? <Navigate replace to="/" /> : <SignupPage />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
