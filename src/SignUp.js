import { useState } from "react";
import axios from "axios";

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
          alert("Sign up success");
          setSignIn(true);
        })
        .catch((err) => {
          alert(err);
        });
      return;
    }
  };

  function checkEmail(email) {
    const rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
    if (!email.match(rule)) {
      alert("Invalid Email");
      return false;
    }
    return true;
  }

  function checkUsername(username) {
    if (username.length < 1) {
      alert("Please enter username");
      return false;
    }
    return true;
  }

  function checkDoublePassword(password, checkPassword) {
    if (password !== checkPassword) {
      alert("Passwords are inconsistent");
      return false;
    }
    if (password < 6) {
      alert("Password must be at least 6 characters long");
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
          C:\Users\TaskManager\SignUp\setEmail
        </label>
        <input
          type="text"
          className="w-full bg-transparent"
          id="setEmail"
          placeholder=">"
          name="setEmail"
          value={user.setEmail}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="setUsername"
          className="text-yellow-500 inline-block w-full"
        >
          C:\Users\TaskManager\SignUp\setUsername
        </label>
        <input
          type="text"
          className="w-full bg-transparent"
          id="setUsername"
          placeholder=">"
          name="setUsername"
          value={user.setUsername}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="setPassword"
          className="text-yellow-500 inline-block w-full"
        >
          C:\Users\TaskManager\SignUp\setPassword
        </label>
        <input
          type="password"
          className="w-full bg-transparent"
          id="setPassword"
          placeholder=">"
          name="setPassword"
          value={user.setPassword}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="checkPassword"
          className="text-yellow-500 inline-block w-full"
        >
          C:\Users\TaskManager\SignUp\checkPassword
        </label>
        <input
          type="password"
          className="w-full bg-transparent"
          id="checkPassword"
          placeholder=">"
          name="checkPassword"
          value={user.checkPassword}
          onChange={(e) => handleChange(e)}
        />
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
