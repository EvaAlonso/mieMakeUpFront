import { XCircleIcon } from "@heroicons/react/16/solid";

const OrderCard = ({ id, name, imageUrl, price, handleDelete}) => {
  return (
    <div className='flex justify-between items-center '>
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img src={imageUrl} alt={name} className="w-full h-full rounded-lg object-cover" />
        </figure>
        <p className="text-sm font-light text-white">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">{price} €</p>
        <XCircleIcon onClick={()=> handleDelete(id)} className='h-10 w-10 text-black cursor-pointer' />
      </div>

    </div>
  )
}

export default OrderCard