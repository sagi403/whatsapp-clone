import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlusIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import FormInputItem from "../base/FormInputItem";
import { emailSvg, passwordSvg } from "../../data/svg";
import { useAuth } from "../../hooks/useAuth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/web");
    }
  }, [user]);

  const submitHandler = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Login To Your Account
          </div>

          <div className="mt-10">
            <form onSubmit={submitHandler}>
              <FormInputItem
                type="email"
                id="email"
                placeholder="E-Mail Address"
                icon={emailSvg}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <FormInputItem
                type="password"
                id="password"
                placeholder="Password"
                icon={passwordSvg}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <a
                    href="#"
                    className="inline-flex text-xs sm:text-sm text-green-500 hover:text-green-700"
                  >
                    Forgot Your Password?
                  </a>
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-600 hover:bg-green-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Login</span>
                  <ArrowRightCircleIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <a
              href="#"
              target="_blank"
              className="inline-flex items-center font-bold text-green-500 hover:text-green-700 text-xs text-center"
            >
              <UserPlusIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
              <span className="ml-2">You don't have an account?</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
