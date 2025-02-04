import { XCircleIcon } from "@heroicons/react/16/solid";

const OrderCard = ({ id, name, imageUrl, price, handleDelete}) => {
  return (
    <div className='flex justify-between items-center m-2'>
      <div className="flex items-center gap-5">
        <figure className="w-20 h-20">
          <img src={imageUrl} alt={name} className="w-full h-full rounded-lg object-cover" />
        </figure>
        <p className="text-sm font-light w-40 text-white">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium w-10">{price} €</p>
        <XCircleIcon onClick={()=> handleDelete(id)} className='h-7 w-7 text-white cursor-pointer' />
      </div>

    </div>
  )
}

export default OrderCard