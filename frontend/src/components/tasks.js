import Task from "./task";
import { UseGeneralContext } from "./context/context";
import { useEffect, useState } from "react";

export default function Tasks(props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const context = UseGeneralContext();

  function handleCategoryChange(e) {
    e.preventDefault();
    setSelectedCategory(e.target.value);
  }

  return (
    <div>
      {/* Category selector */}
      <div className="flex items-center gap-8 pl-44  ">
        <label>Select category</label>
        <select
          onChange={handleCategoryChange}
          className="block py-2.5 px-0 w-2/12 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option value={"All"}> All </option>
          {context.globalCategories.map((cat) => {
            return (
              <option id={cat} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
        <div id="Effect" className="w-8/12  h-1 "></div>
      </div>
      <div className="w-full flex justify-center  ">
        <div className="flex flex-wrap w-3/4 h-3/4 gap-x-4 pt-4  ">
          {context.tasks.map((a) => {
            if (
              a.archived === props.archived &&
              (a.categories.includes(selectedCategory) ||
                selectedCategory === "All")
            ) {
              return <Task task={a} key={a.id} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
