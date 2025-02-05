import { useNavigate } from "react-router-dom"
import { PlusIcon } from "@heroicons/react/24/outline"

const CreateProductBtn = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/create-product")
  }

  return (
    <button
      onClick={handleClick}
      className="relative inline-flex items-center justify-center p-1 mb-2 mr-12 overflow-hidden text-xl font-medium  rounded-lg   hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ml-auto"
      aria-label="Create new product"
    >
      <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-gray-800 rounded-md group-hover:bg-opacity-0">
        <PlusIcon className="w-4 h-4 inline-block mr-2 text-white text-3xl" aria-hidden="true" />
        <span className="align-middle">Create Product</span>
      </span>
    </button>
  )
}

export default CreateProductBtn

