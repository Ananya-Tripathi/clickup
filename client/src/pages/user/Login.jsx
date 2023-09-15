import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const [id, setID] = useState("");
  async function Login(ev) {
    ev.preventDefault();
    const { data } = await axios
      .post(`http://localhost:5000/api/user/login`, {
        email: email,
        password: password,
      })
      .catch((error) => {
        console.log(error);
      });
    setID(data.id);
    setRedirect(true);
    console.log(data);
    alert(data.message);

    console.log(id);
  }
  if (redirect) {
    return <Navigate to={`/workspace/${id}`} />;
  }
  return (
    <div className="w-96 h-64 my-auto ">
      <form
        className=" bg-lightGrey rounded-sm p-6 text-darkGrey"
        onSubmit={Login}
      >
        <input
          type="text"
          placeholder="example@mail.com"
          className="block w-full p-2 border rounded-lg mb-4"
          onChange={(ev) => setemail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 border rounded-lg mb-4"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="submit"
          className="bg-purple text-white px-4 py-2 rounded-lg hover:cursor-pointer w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
