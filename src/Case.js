import { RiDeleteBack2Fill } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swal = withReactContent(Swal);
function loading() {
  swal.fire({
    title: "Loading",
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 650,
  });
}

const Case = ({ task, id, content, completed_at, category, setList }) => {
  const renderContent = content.split("/-t");
  const url = `https://todoo.5xcamp.us/todos/${id}`;
  let isRender = true;
  if (
    (category === "done" && !completed_at) ||
    (category === "undone" && completed_at)
  ) {
    isRender = false;
  }

  const changeStatus = () => {
    function toggle() {
      return axios.patch(url + "/toggle");
    }

    function editedTime() {
      const time = new Date();
      const createdTime = time.toString().slice(0, 24);
      const sendData = {
        todo: { content: `${renderContent[0]}/-t${createdTime} (Edited)` },
      };
      return axios.put(url, sendData);
    }

    loading();
    axios
      .all([toggle(), editedTime()])
      .then(
        axios.spread((toggleResult, editResult) => {
          setList((prevData) => {
            const renderData = {
              completed_at: toggleResult.data.completed_at,
              content: editResult.data.content,
              id: id,
            };

            const newData = [...prevData];
            newData.splice(prevData.indexOf(task), 1);
            newData.unshift(renderData);
            return newData;
          });
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const remove = () => {
    loading();
    axios.delete(url).then((res) => {
      setList((prevData) => {
        const newData = [...prevData];
        newData.splice(prevData.indexOf(task), 1);
        return newData;
      });
    });
  };

  return (
    <li
      className={`flex items-center justify-between mb-4 ${
        !isRender && "hidden"
      }`}
    >
      <div>
        <div
          className="cursor-pointer"
          onClick={() => {
            changeStatus();
          }}
        >
          Status:&nbsp;&nbsp;
          {completed_at ? (
            <span className="text-green-500">Done</span>
          ) : (
            <span className="text-red-600">Undone</span>
          )}
        </div>
        <div>
          Time:&nbsp;&nbsp;
          {renderContent[1]}
        </div>
        <div className="break-all">
          Info:&nbsp;&nbsp;
          {renderContent[0]}
        </div>
      </div>
      <RiDeleteBack2Fill
        className="hover:text-red-600 text-xl cursor-pointer"
        onClick={() => {
          remove();
        }}
      />
    </li>
  );
};

export default Case;
