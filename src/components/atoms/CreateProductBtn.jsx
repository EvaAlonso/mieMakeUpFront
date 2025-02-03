
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

const CreateProductBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-product');
  };

  return (
    <button onClick={handleClick} className="rounded-md bg-indigo-500"><PlusIcon/>Create Product</button>
  )
}

export default CreateProductBtn;