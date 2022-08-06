import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swal = withReactContent(Swal);
const url = "https://todoo.5xcamp.us/users";

const SignUp = ({ setSignIn }) => {
  const [user, setUser] = useState({
    setEmail: "",
    setUsername: "",
    setPassword: "",
    checkPassword: "",
  });
  const handleChange = (e) => {
    const name = e.target.getAttribute("name");
    const value = e.target.value;
    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { setEmail, setUsername, setPassword, checkPassword } = user;
    if (
      !checkEmail(setEmail) ||
      !checkUsername(setUsername) ||
      !checkDoublePassword(setPassword, checkPassword)
    ) {
      return;
    } else {
      const obj = {
        user: { email: setEmail, nickname: setUsername, password: setPassword },
      };
      axios
        .post(url, obj)
        .then((res) => {
          swal.fire({
            icon: "success",
            title: "Sign up succeeds",
            showConfirmButton: false,
            timer: 1500,
          });
          setSignIn(true);
        })
        .catch((err) => {
          swal.fire({
            icon: "error",
            title: "Sign up fails",
          });
        });
      return;
    }
  };

  function checkEmail(email) {
    const rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
    if (!email.match(rule)) {
      swal.fire({
        icon: "error",
        title: "Invalid email",
      });
      return false;
    }
    return true;
  }

  function checkUsername(username) {
    if (username.length < 1) {
      swal.fire({
        icon: "error",
        title: "Please enter username",
      });
      return false;
    }
    return true;
  }

  function checkDoublePassword(password, checkPassword) {
    if (password.length < 6) {
      swal.fire({
        icon: "error",
        title: "Password must be at least 6 characters long",
      });
      return false;
    }
    if (password !== checkPassword) {
      swal.fire({
        icon: "error",
        title: "Inconsistent passwords",
      });
      return false;
    }
    return true;
  }

  return (
    <form className="px-5">
      <div className="mb-3">
        <label
          htmlFor="setEmail"
          className="text-yellow-500 inline-block w-full"
        >
          Configure-- Enter your email
        </label>
        <div className="relative">
          <span className="absolute pointer-events-none">{">"}</span>
          <input
            type="text"
            id="setEmail"
            name="setEmail"
            value={user.setEmail}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="setUsername"
          className="text-yellow-500 inline-block w-full"
        >
          Configure-- Enter your name
        </label>
        <div className="relative">
          <span className="absolute pointer-events-none">{">"}</span>
          <input
            type="text"
            id="setUsername"
            name="setUsername"
            value={user.setUsername}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="setPassword"
          className="text-yellow-500 inline-block w-full"
        >
          Configure-- Enter your password
        </label>
        <div className="relative">
          <span className="absolute pointer-events-none">{">"}</span>
          <input
            type="password"
            id="setPassword"
            name="setPassword"
            value={user.setPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="checkPassword"
          className="text-yellow-500 inline-block w-full"
        >
          Check-- Enter your email again
        </label>
        <div className="relative">
          <span className="absolute pointer-events-none">{">"}</span>
          <input
            type="password"
            id="checkPassword"
            name="checkPassword"
            value={user.checkPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <button
        className="block mx-auto py-3 px-6 mb-5 hover:bg-gray-800"
        onClick={(e) => handleClick(e)}
      >
        Y/y
      </button>
    </form>
  );
};

export default SignUp;
