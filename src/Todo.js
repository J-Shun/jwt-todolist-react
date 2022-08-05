import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Terminal from "./Terminal";
import Log from "./Log";
import Case from "./Case";

const url = "https://todoo.5xcamp.us/";

function Todo() {
  const [goHome, setGoHome] = useState(false);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("all");
  const [task, setTask] = useState({
    Date: "",
    Info: "",
    Status: "",
  });

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    axios.defaults.headers.common["Authorization"] = auth;
    if (!auth) {
      return setGoHome(true);
    }

    function checkLogin() {
      return axios.get(url + "check");
    }

    function getData() {
      return axios.get(url + "todos");
    }

    axios
      .all([checkLogin(), getData()])
      .then(
        axios.spread((checkResult, getResult) => {
          setList(getResult.data.todos);
          console.log(list);
        })
      )
      .catch((err) => {
        localStorage.removeItem("auth");
        setGoHome(true);
      });
  }, []);

  const handleChange = (e) => {
    setTask((prevData) => {
      return {
        ...prevData,
        Info: e.target.value,
      };
    });
  };

  if (goHome) return <Navigate to="/" />;

  return (
    <Terminal>
      <Log category={category} setCategory={setCategory} />
      <ul className="px-2 max-h-123 overflow-auto scrollbar-hide">
        <Case />
        <Case />
        <Case />
        <Case />
        <Case />
        <Case />
        <Case />
        <Case />
      </ul>
      <hr></hr>
      <div className="relative px-2">
        <span className="absolute pointer-events-none">{">"}</span>
        <input type="text" onChangeCapture={(e) => handleChange(e)} />
        {task.Info.length > 0 && (
          <button className="block ml-4 text-yellow-500 hover:bg-gray-800">
            Click to add
          </button>
        )}
      </div>
    </Terminal>
  );
}

export default Todo;
