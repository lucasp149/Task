import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

const GeneralContext = createContext();

export default function Context({ children }) {
  const [tasks, setTasks] = useState([]);
  const [change, setChange] = useState(false);
  const [axiosMessage, setAxiosMessage] = useState();
  const [globalCategories, setGlobalCategories] = useState([]);

  // async global categories update when tasks already change
  useEffect(() => {
    if (tasks) {
      updateCategories();
    }
  }, [tasks]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_DIR)
      .then(function (response) {
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setChange(false);
      });
  }, [change]);

  function updateCategories() {
    const temp = [];

    tasks.forEach((task) => {
      task.categories.forEach((cat) => {
        if (!temp.includes(cat)) {
          temp.push(cat);
        }
      });
    });

    setGlobalCategories(temp);
  }

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_SERVER_DIR}/${id}`)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setChange(true));
  }

  function handleEdit(id, editedTask) {
    axios
      .patch(`${process.env.REACT_APP_SERVER_DIR}/${id}`, editedTask)
      .then(function (response) {
        setAxiosMessage(response.status);
      })
      .catch(function (error) {
        setAxiosMessage(error.response.data.message);
      })
      .finally(() => setChange(true));
  }

  function handleArchived(id, currentStatus) {
    axios
      .patch(`${process.env.REACT_APP_SERVER_DIR}/${id}`, {
        archived: !currentStatus,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setChange(true));
  }

  function handleCreate(newTask) {
    axios
      .post(process.env.REACT_APP_SERVER_DIR, newTask)
      .then(function (response) {
        setAxiosMessage(response.status);
      })
      .then((res) => {
        setChange(true);
      })
      .catch(function (error) {
        setAxiosMessage(error.response.data.message);
      });
  }
  return (
    <GeneralContext.Provider
      value={{
        tasks,
        axiosMessage,
        globalCategories,
        handleDelete,
        handleEdit,
        handleArchived,
        handleCreate,
        setAxiosMessage,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export function UseGeneralContext() {
  return useContext(GeneralContext);
}
