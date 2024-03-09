import { Route, Routes } from "react-router-dom";
import { LoginPage, SignupPage } from "./Routes";
import CustomToast from "./components/toast/CustomToast";

export default function App() {
  return (
    <>
      <CustomToast />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </>
  );
}
