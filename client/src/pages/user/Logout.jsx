import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Logout = () => {
  const [redirect, setRedirect] = useState("");
  async function logout() {
    console.log("hello");
    const { data } = await axios.post(`http://localhost:5000/api/user/logout`);
    setRedirect(true);
    alert(data.message);
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
