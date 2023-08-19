import { UseGeneralContext } from "./context/context";
import { useState } from "react";
import NewTask from "./modals/newTask";
import Delete from "./modals/delete";

export default function Task(props) {
  const [editionMode, setEditionMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const context = UseGeneralContext();


// HANDLERS
  function handleEdit(e) {
    e.preventDefault();
    setEditionMode(true);
  }

  function handleDelete(e) {
    e.preventDefault();
    setDeleteMode(true);
  }

  return (
    <div className="w-80 mb-4 ">
      {editionMode && (
        <NewTask
          id={props.task.id}
          editMode={true}
          title={props.task.title}
          description={props.task.description}
          categories={props.task.categories}
          setEditionMode={setEditionMode}
        />
      )}
      {deleteMode && (
        <Delete id={props.task.id} setDeleteMode={setDeleteMode} />
      )}
      <div className="relative h-60 border-r-2 border-b-2 border-l-2 border-slate-200  lg:border-l-2 lg:border-t-2  lg:border-slate-200 bg-white rounded-b hover:border-gray-500  hover:border-2 lg:rounded-b-none lg:rounded-r p-4 flex flex-col leading-normal shadow-xl duration-200">
        <div className="flex items-center gap-3 ">
          <h4 className="font-semibold ">{props.task.title}</h4>
          <p className="font-thin text-xs   ">
            {props.task.modify.toString().substring(0, 10)}
          </p>
        </div>

        <p className="inline break-words h-60 ">{props.task.description}</p>

        <div className="absolute flex bottom-0 right-1 gap-2 mb-2 mr-2 ">
          <button className="w-4 hover:scale-150 duration-150" onClick={handleDelete}>
            <img src="./delete.png" alt="Trash Can" />
          </button>
         
          <button className="w-4 hover:scale-150 duration-150" onClick={handleEdit}>
            <img src="./edit.png" alt="Edit pencil"/>
          </button>
          <button
            className="w-4 hover:scale-150 duration-150"
            onClick={() =>
              context.handleArchived(props.task.id, props.task.archived)
            }
          >
            {!props.task.archived ? (
              <img src="./archive-down.png" alt="Archive Down"/>
            ) : (
              <img src="./archive-up.png" alt="Archive Up"/>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
