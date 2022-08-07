import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swal = withReactContent(Swal);
const url = "https://todoo.5xcamp.us/users/sign_in";

const SignIn = ({ setGoTodo }) => {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.getAttribute("name");
    const value = e.target.value;
    setSignIn((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { email, password } = signIn;
    const obj = { user: { email: email, password: password } };
    axios.defaults.headers.common["Authorization"] = "";
    axios
      .post(url, obj)
      .then((res) => {
        localStorage.setItem("auth", res.headers.authorization);
        swal.fire({
          icon: "success",
          title: "Sign In succeeds",
          showConfirmButton: false,
          timer: 1500,
        });
        setGoTodo(true);
      })
      .catch((err) => {
        console.log(err);
        swal.fire({
          icon: "error",
          title: "Invalid email and password",
        });
      });
  };

  return (
    <form className="px-5">
      <div className="mb-3">
        <label
          htmlFor="enterEmail"
          className="text-yellow-500 inline-block w-full"
        >
          Enter email:
        </label>
        <div className="relative">
          <span className="absolute pointer-events-none">{">"}</span>
          <input
            type="text"
            id="enterEmail"
            name="email"
            value={signIn.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="password"
          className="text-yellow-500 inline-block w-full"
        >
          Enter password:
        </label>
        <div className="relative">
          <span className="absolute pointer-events-none">{">"}</span>
          <input
            type="password"
            id="password"
            name="password"
            value={signIn.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
      </div>
      <button
        className="block mx-auto py-3 px-6 mb-5 hover:bg-gray-800"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Y/y
      </button>
    </form>
  );
};

export default SignIn;
