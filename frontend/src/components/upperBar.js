import { useState } from "react";
import NewTask from "./modals/newTask";


export default function UpperBar(props) {
  const [newTask, setNewTask] = useState(false);
  

  return (
    <div>
      {/* New Task modal*/}
      {newTask && <NewTask setNewTask={setNewTask} editMode={false} />}

      {/* Complete Upper Bar*/}
      <div className="flex w-full h-44 bg-slate-50 border-b-2 border-slate-300 gap-10 align-middle  items-center pl-44">
        <h1 className="text-5xl font-barriecito">
          {!props.showArchived ? "My Notes" : "Archived notes"}
        </h1>
        {!props.showArchived && (
          <button
            className="transition duration-100 ease-in-out bg-transparent hover:bg-slate-700 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
            onClick={() => setNewTask(true)}
          >
            Create Note
          </button>
        )}

        <button
          className="text-blue-600 "
          onClick={() => props.setShowArchived(!props.showArchived)}
        >
          {props.showArchived
            ? "<- go back to unarchived notes"
            : "Show Archived"}
        </button>
      </div>
    </div>
  );
}
