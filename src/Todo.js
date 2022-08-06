import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Log from "./Log";
import Case from "./Case";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swal = withReactContent(Swal);
const loading = () => {
  swal.fire({
    title: "Loading",
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 600,
  });
};
const url = "https://todoo.5xcamp.us/";

const Todo = () => {
  const [goHome, setGoHome] = useState(false);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("all");
  const [task, setTask] = useState({
    info: "",
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
        info: e.target.value,
      };
    });
  };

  const addTask = () => {
    const time = new Date();
    const createdTime = time.toString().slice(0, 24);
    const sendData = {
      todo: { content: `${task.info}/-t${createdTime} (Created)` },
    };
    if (sendData.length < 1) return;

    if (task.info.includes("/-q")) return logout();

    setTask({ info: "" });
    loading();
    axios
      .post(url + "todos", sendData)
      .then((res) => {
        setList((prevData) => {
          return [res.data, ...prevData];
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const logout = () => {
    loading();
    axios.delete(url + "users/sign_out").then((res) => {
      localStorage.removeItem("auth");
      setGoHome(true);
    });
  };

  if (goHome) return <Navigate to="/" />;

  return (
    <>
      <Log category={category} setCategory={setCategory} />
      <ul className="px-2 h-123 overflow-auto scrollbar-hide">
        {list.map((task) => {
          const { id, content, completed_at } = task;
          return (
            <Case
              key={id}
              task={task}
              id={id}
              content={content}
              completed_at={completed_at}
              category={category}
              setList={setList}
            />
          );
        })}
      </ul>
      <hr></hr>
      <div className="relative p-2">
        <span className="absolute pointer-events-none">{">"}</span>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (e.target.value < 1) return;
              addTask();
            }
          }}
          value={task.info}
        />
        {task.info.length > 0 && (
          <button
            className="block ml-4 text-yellow-500 hover:bg-gray-800"
            onClick={() => {
              addTask();
            }}
          >
            Press "Enter" or click here to add task
          </button>
        )}
      </div>
    </>
  );
};

export default Todo;
