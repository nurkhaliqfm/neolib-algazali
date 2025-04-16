import { useState, useRef, useEffect } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "@src/hooks/useAuth";
import LoginImage from "@src/assets/img/login.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [passShowState, setPassShowState] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username: username, password: password };

    await axios
      .post(`${API_BASE_URL}/auth`, data, {
        withCredentials: true,
      })
      .then((response) => {
        const accessToken = response?.data?.accessToken;
        setAuth({ username, accessToken });

        setUsername("");
        setPassword("");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (!err) {
          setErrMsg("No Server Response");
        } else if (err.response?.data?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.data?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }

        errRef.current.focus();
      });
  };
  return (
    <section className="bg-color_2 min-h-screen flex items-center justify-center">
      <div className="bg-primary flex justify-center items-center rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="md:w-1/2 md:px-16 px-6">
          <h2 className="font-bold text-3xl text-color_3">Login</h2>
          <p className="text-sm text-color_3">Classroom Management System</p>
          <p ref={errRef} className="">
            {errMsg}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-4 rounded-md border border-color_2 focus:outline-color_3"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              ref={userRef}
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-md border border-color_2 w-full focus:outline-color_3"
                type={passShowState ? "password" : "text"}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passShowState ? (
                <HiOutlineEye
                  className="cursor-pointer scale-110 text-color_4 hover:text-color_3 absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setPassShowState(!passShowState)}
                />
              ) : (
                <HiOutlineEyeOff
                  className="cursor-pointer scale-110 text-color_4 hover:text-color_3 absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setPassShowState(!passShowState)}
                />
              )}
            </div>
            <button className="bg-color_3 rounded-md py-2 text-primary hover:scale-105 duration-300">
              Login
            </button>
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={LoginImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Login;
