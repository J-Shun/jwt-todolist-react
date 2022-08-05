import Category from "./Category";

const Log = ({ category, setCategory }) => {
  const handleClick = (e) => {
    setCategory(e.target.getAttribute("name"));
  };

  return (
    <Category>
      <button
        className={`flex-1 py-3 px-1 text-xl bg-gray-800 hover:bg-transparent ${
          category === "all" && "bg-transparent"
        }`}
        name="all"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {">"}All
      </button>
      <button
        className={`flex-1 py-3 px-1 text-xl bg-gray-800 hover:bg-transparent ${
          category === "done" && "bg-transparent"
        }`}
        name="done"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {">"}Done
      </button>
      <button
        className={`flex-1 py-3 px-1 text-xl bg-gray-800 hover:bg-transparent ${
          category === "undone" && "bg-transparent"
        }`}
        name="undone"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {">"}Undone
      </button>
    </Category>
  );
};

export default Log;
