import { useEffect, useState } from "react";
import { UseGeneralContext } from "../context/context";
import Categories from "../categories";

export default function NewTask(props) {
  const [newTask, setNewTask] = useState();
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [categories, setCategories] = useState(props.categories || []);

  const context = UseGeneralContext();

  // This is the async checking of axios post and patch. Checks if the call was succesfull
  useEffect(() => {
    if (context.axiosMessage === 201 && !props.editMode) {
      props.setNewTask(false);
      context.setAxiosMessage(null);
    }
    if (context.axiosMessage === 200 && props.editMode) {
      props.setEditionMode(false);
      context.setAxiosMessage(null);
    }
  }, [context.axiosMessage]);

  // This submit the changes to the back. Choise between New or Edit
  useEffect(() => {
    if (newTask) {
      if (!props.editMode) {
        context.handleCreate(newTask);
      } else {
        context.handleEdit(props.id, newTask);
      }
    }
  }, [newTask]);

  // Submit the form to internal state
  function handleSubmit(e) {
    e.preventDefault();
   // const title = document.getElementById("title").value;
   //const description = document.getElementById("description").value;
    setNewTask({ title: title, description: description, categories: categories });
  }

  // HANDLERS
  function handleChange(e) {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
    }
  }

  function handleBack(e) {
    e.preventDefault();
    if (!props.editMode) {
      props.setNewTask(false);
    } else {
      props.setEditionMode(false);
    }
    context.setAxiosMessage(null);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="bg-white p-2 rounded w-5/12 h-4/6 px-14 border-4 border-black shadow-lg ">
        {/* The form is the same for New or Edit mode. The difference is on the input default values*/}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full w-full justify-center justify-items-center  "
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="title"
              name="title"
              placeholder=""
              value={title}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
              required
            ></input>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group  ">
            <textarea
              type="text"
              id="description"
              placeholder=""
              value={description}
              onChange={handleChange}
              className="h-40 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-l-gray-100 focus:border-r-gray-100 focus:border-l focus:border-r  focus:outline-none focus:ring-0 focus:border-black peer resize-none"
            ></textarea>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Description
            </label>
          </div>
          <p className="text-center pb-4 text-xs text-opacity-80 text-red-800">
            {context.axiosMessage}
          </p>
          
          {/* Categories addon */}
          <Categories categories={categories} setCategories={setCategories}/>

          {/* Buttons */}
          <div className="flex gap-5 justify-center">
            <input
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer"
              type="submit"
              value="Send"
            ></input>

            <button onClick={handleBack}> Back </button>
          </div>
        </form>
      </div>
    </div>
  );
}
