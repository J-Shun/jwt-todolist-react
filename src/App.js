import Home from "./Home";
import Todo from "./Todo";
import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Terminal from "./Terminal";
import img from "./img/axiom-pattern.png";

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const changeMode = () => {
    setIsDark(!isDark);
  };

  return (
    <main
      className={`bg-repeat min-h-screen text-white px-5 overflow-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
      style={{ backgroundImage: `url(${img})` }}
    >
      <h1
        className={`md:text-4xl text-2xl text-center my-10 break-words ${
          isDark || "text-black"
        }`}
      >
        C:\User\App\TaskManager
      </h1>
      <div className="flex justify-center">
        {isDark ? (
          <BsFillSunFill
            className="text-2xl hover:text-yellow-300 ease-out duration-300 cursor-pointer"
            onClick={changeMode}
          />
        ) : (
          <BsFillMoonFill
            className="text-2xl text-black hover:text-purple-300 ease-out duration-300 cursor-pointer"
            onClick={changeMode}
          />
        )}
      </div>
      <Terminal isDark={isDark}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </HashRouter>
      </Terminal>
    </main>
  );
};

export default App;
