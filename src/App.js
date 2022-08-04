import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useState } from "react";

function App() {
  const [signIn, setSignIn] = useState(true);

  return (
    <main
      className="bg-repeat min-h-screen bg-black overflow-hidden"
      style={{ backgroundImage: `url(./img/axiom-pattern.png)` }}
    >
      <h1 className="text-5xl text-green-500 text-center my-10">
        C:\Users\App\TaskManager
      </h1>
      <div className="max-w-lg mx-auto border-2 border-white text-green-500 bg-gray-700 mt-5">
        <div className="flex mb-8">
          <button
            className={`w-1/2 py-3 px-6 text-2xl bg-gray-800 hover:bg-transparent ${
              signIn === true && "bg-transparent"
            }`}
            onClick={() => {
              setSignIn(true);
            }}
          >
            >Sign In
          </button>
          <button
            className={`w-1/2 py-3 px-6 text-2xl bg-gray-800 hover:bg-transparent ${
              signIn === false && "bg-transparent"
            }`}
            onClick={() => {
              setSignIn(false);
            }}
          >
            >Sign Up
          </button>
        </div>
        {signIn ? <SignIn /> : <SignUp setSignIn={setSignIn} />}
      </div>
    </main>
  );
}

export default App;
