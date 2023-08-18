import { useState } from "react";
import "./App.css";
import Context from "./components/context/context";
import NewTask from "./components/modals/newTask";
import Tasks from "./components/tasks";
import UpperBar from "./components/upperBar";

function App() {
  const [showArchived, setShowArchived] = useState(false);
  const [newTask, setNewTask] = useState(false);

  return (
    <Context>
      {newTask ? (
        <NewTask setNewTask={setNewTask}/>
      ) : (
        <>
          <UpperBar
            setShowArchived={setShowArchived}
            showArchived={showArchived}
            setNewTask={setNewTask}
          />
          <Tasks archived={showArchived} />
        </>
      )}
    </Context>
  );
}

export default App;
