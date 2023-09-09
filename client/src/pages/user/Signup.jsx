import React, { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  async function Signup(ev) {
    ev.preventDefault();
    const { data } = await axios.post(`http://localhost:5000/api/user/signup`, {
      name,
      username,
      email,
      password,
    });
    alert(data.message);
    console.log(data);
  }
  return (
    <div className="w-96 h-64 my-auto ">
      <form className="bg-lightGrey rounded-sm p-6" onSubmit={Signup}>
        <input
          type="text"
          placeholder="Name"
          className="block w-full p-2 border rounded-lg mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          className="block w-full p-2 border rounded-lg mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email id"
          className="block w-full p-2 border rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 border rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="block w-full p-2 border rounded-lg mb-4"
          value={cnfpassword}
          onChange={(e) => setCnfPassword(e.target.value)}
        />

        <button className="button w-full">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
