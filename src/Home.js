import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Terminal from "./Terminal";
import Category from "./Category";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import axios from "axios";

const url = "https://todoo.5xcamp.us/check";

function Home() {
  const [signIn, setSignIn] = useState(true);
  const [goTodo, setGoTodo] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) return;
    axios
      .get(url, { headers: { Authorization: auth } })
      .then((res) => {
        setGoTodo(true);
      })
      .catch((err) => {
        localStorage.removeItem("auth");
      });
  }, []);

  if (goTodo) return <Navigate to="/todo" />;

  return (
    <>
      <Terminal>
        <Category>
          <button
            className={`flex-1 py-3 px-6 text-xl bg-gray-800 hover:bg-transparent ${
              signIn === true && "bg-transparent"
            }`}
            onClick={() => {
              setSignIn(true);
            }}
          >
            >Sign In
          </button>
          <button
            className={`flex-1 py-3 px-6 text-xl bg-gray-800 hover:bg-transparent ${
              signIn === false && "bg-transparent"
            }`}
            onClick={() => {
              setSignIn(false);
            }}
          >
            >Sign Up
          </button>
        </Category>
        {signIn ? (
          <SignIn setGoTodo={setGoTodo} />
        ) : (
          <SignUp setSignIn={setSignIn} />
        )}
      </Terminal>
    </>
  );
}

export default Home;
