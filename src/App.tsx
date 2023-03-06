import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import Navbar from "./components/Navbar/Navbar";
import { loadFromLocalStorage } from "./hooks/useSaveAndLoadLocalStorage";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { loginUser } from "./redux/userSlice";
import { Helmet } from "react-helmet";

function App() {
  const user = useAppSelector((state) => state.user.user);
  const titleTab = useAppSelector((state) => state.app.titleTab);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const localFirebaseData = loadFromLocalStorage();
    if (localFirebaseData && !user.isLoggedIn) {
      dispatch(loginUser(localFirebaseData));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLoggedIn]);

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{titleTab}</title>
      </Helmet>
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
