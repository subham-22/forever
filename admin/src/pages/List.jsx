import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const List = ({token}) => {
  const [list, setList] = useState([])
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setList(response.data.products)
      
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Fetch Error:", error)
      toast.error(error.message)
    }
  }

  const removeProduct  = async(id)=>{
      try {
        const response = await axios.post(backendUrl + '/api/product/remove',{id},{headers:{token}})
        if (response.data.success) {
          toast.success(response.data.message)
          await fetchList();
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 text-lg font-semibold'>All Product List</p>
      <div className='flex flex-col gap-2'>

        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-medium'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {
          list.length === 0 ? (
            <p className='text-gray-500 text-center py-4'>No products found.</p>
          ) : (
            list.map((item, index) => {
              const imageUrl = item.images?.[0]
                ? item.images[0]
                : 'https://placehold.co/64x64'

              return (
                <div
                  key={index}
                  className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border-b text-sm'
                >
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className='w-16 h-16 object-cover rounded'
                    onError={(e) => { e.target.src = 'https://placehold.co/64x64' }}
                  />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{currency}{item.price}</p>
                  <div className='text-center'>
                    <button onClick={() => navigate(`/edit/${item._id}`)} className='text-blue-500 hover:underline'>Edit</button>
                    <button onClick={()=>removeProduct(item._id)} className='text-red-500 hover:underline ml-2'>Delete</button>
                  </div>
                </div>
              )
            })
          )
        }

      </div>
    </>
  )
}

export default List
