import { useState } from "react";

export default function Categories(props) {
  const [category, setCategory] = useState();

  function handleAddCategory(e) {
    e.preventDefault();
    const previousList = [...props.categories];
    previousList.push(category);
    props.setCategories(previousList);
    setCategory("");
  }

  function handleChange(e) {
    setCategory(e.target.value);
  }

  function handleDeleteCategory(category, e) {
    e.preventDefault();
    const index = props.categories.indexOf(category);
    const previousList = [...props.categories];
    previousList.splice(index, 1);
    props.setCategories(previousList);
  }

  return (
    <div>
      <div id="box" className="inline-flex h-20 w-full border flex-wrap gap-3 justify-start p-5 overflow-auto overflow-x-hidden ">
        {props.categories.map((a) => {
          return (
            <div className="flex items-center align-middle gap-1 h-6 ">
              <img className="w-3 h-3" src="./tag.png" alt="Tag" />
              <p className="text-sm  ">{a}</p>
              <button onClick={(e) => handleDeleteCategory(a, e)}><img className="w-3 h-3" src="./close.png"/></button>
            </div>
          );
        })}
      </div>
      <div id="inputBox" className="relative z-0 w-full mb-6 group flex items-center gap-4">
        <input
          type="text"
          onChange={handleChange}
          value={category}
          placeholder=""
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
        ></input>
        <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          New category
        </label>
        <button onClick={handleAddCategory}>   <img className="w-5 h-5 translate-y-2 peer-focus:translate-x-2 " src="./add.png" alt="Add" /></button>
      </div>
    </div>
  );
}
