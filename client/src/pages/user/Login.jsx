import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function Login(ev) {
    ev.preventDefault();
    const { data } = await axios.post(`${process.env.BASE_URL}/user/login`, {
      email: username,
      password: password,
    });
    console.log(data);
  }
  return (
    <div className="w-96 h-64 my-auto ">
      <form
        className=" bg-lightGrey rounded-sm p-6 text-darkGrey"
        onSubmit={Login}
      >
        <input
          type="text"
          placeholder="Username"
          className="block w-full p-2 border rounded-lg mb-4"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 border rounded-lg mb-4"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="submit"
          className="bg-orange text-white px-4 py-2 rounded-lg hover:cursor-pointer w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
