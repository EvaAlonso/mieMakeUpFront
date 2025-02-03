
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom"; 

const EditProductBtn = ({ productId }) => {
  return (
    <Link to={`/update-product/${productId}`}>
        <PencilSquareIcon className="w-5 h-5" />
    </Link>
  );
}

export default EditProductBtn;
