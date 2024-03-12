import { Route, Routes, useNavigate } from "react-router-dom";
import { ActivationPage, HomePage, LoginPage, SignupPage } from "./Routes";
import CustomToast from "./components/toast/CustomToast";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { getUser } from "./redux/actions/user";

export default function App() {
  useEffect(() => {
    Store.dispatch(getUser());
  }, []);

  return (
    <>
      <CustomToast />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation/:token" element={<ActivationPage />} />
      </Routes>
    </>
  );
}
