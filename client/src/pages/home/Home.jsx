import React, { useState } from "react";
import Login from "../user/Login";
import Signup from "../user/Signup";

const Home = () => {
  const [login, setLogin] = useState(false);

  const handleLoginClick = () => {
    setLogin(true);
  };

  const handleSignupClick = () => {
    setLogin(false);
  };

  return (
    <div className="bg-darkGrey min-h-screen flex flex-grow-0 space-x-10">
      <div className="min-h-screen px-10 bg-orange text-orange"></div>
      <div className="md:flex md:flex-grow-0 space-x-52">
        <div className="text-white max-h-xl min-w-2xl max-w-3xl m-auto">
          <p className="font-bold text-7xl ">CLICK UP!</p>
          <p className="font-bold text-2xl px-2">Let's get work done ?</p>
        </div>
        <div className="text-white bg-lightGrey text-center h-2/6 mt-20 pt-6 ">
          <button
            className="button bg-lightGrey hover:text-darkGrey"
            onClick={handleLoginClick}
          >
            LOGIN
          </button>
          <button
            className="button bg-lightGrey hover:text-darkGrey"
            onClick={handleSignupClick}
          >
            SIGNUP
          </button>
          {login ? (
            <>
              <Login />
              <p
                className="mt-[-24px] hover:cursor-pointer"
                onClick={handleSignupClick}
              >
                New here? Sign up
              </p>
            </>
          ) : (
            <Signup />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
