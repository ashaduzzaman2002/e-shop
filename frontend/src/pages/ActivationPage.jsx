import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

const ActivationPage = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);

  const sendRequest = async () => {
    try {
      const { data } = await axiosInstance.post("/user/activate", {
        activation_token: token,
      });
      console.log(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (token) {
      sendRequest();
    }
    console.log("object");
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {error ? (
        <p className="text-red-500">Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}

      <Link to='/' className="uppercase text-sm mt-4">Go Back →</Link>
    </div>
  );
};

export default ActivationPage;
