import Home from "./Home";
import Todo from "./Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main
      className="bg-repeat min-h-screen bg-black overflow-hidden text-green-500 px-5"
      style={{ backgroundImage: `url(./img/axiom-pattern.png)` }}
    >
      <h1 className="md:text-4xl text-2xl text-center my-10 break-words">
        C:\User\App\TaskManager
      </h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
