import { UseGeneralContext } from "../context/context";

export default function Delete(props) {
  const context = UseGeneralContext();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="flex flex-col gap-4 items-center    justify-center bg-white p-2 rounded w-5/12 h-2/6 px-14 border-4 border-red-700    shadow-lg ">
        <h3 className="text-lg mb-5 ">
          Are you sure you want to delete this record?
        </h3>

        <div className="flex gap-5 justify-center">
          <button
            onClick={() => context.handleDelete(props.id)}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={() => props.setDeleteMode(false)}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow cursor-pointer"
          >
            {" "}
            No{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
