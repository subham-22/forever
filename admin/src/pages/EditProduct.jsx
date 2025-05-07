import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const EditProduct = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    price: '',
    sizes: [],
    bestseller: false,
    images: []
  })

  const fetchProduct = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/single`, { productId: id })
      if (response.data.success) {
        const product = response.data.product
        setForm({
          name: product.name,
          description: product.description,
          category: product.category,
          subCategory: product.subCategory,
          price: product.price,
          sizes: product.sizes || [],
          bestseller: product.bestseller || false,
          images: product.images || [],
        })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Fetch Error:", error)
      toast.error("Failed to fetch product")
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'sizes') {
      const sizesArray = value.split(',').map(s => s.trim())
      setForm(prev => ({ ...prev, sizes: sizesArray }))
    } else if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = (index, value) => {
    const updatedImages = [...form.images]
    updatedImages[index] = value
    setForm(prev => ({ ...prev, images: updatedImages }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${backendUrl}/api/product/update`, {
        id,
        ...form
      }, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success("Product updated successfully")
        navigate('/admin/products')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Update Error:", error)
      toast.error("Failed to update product")
    }
  }

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h2 className='text-xl font-semibold mb-4'>Edit Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>

        <input
          type='text'
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder='Name'
          className='w-full p-2 border rounded'
          required
        />

        <textarea
          name='description'
          value={form.description}
          onChange={handleChange}
          placeholder='Description'
          className='w-full p-2 border rounded'
          rows={3}
        />

        <input
          type='text'
          name='category'
          value={form.category}
          onChange={handleChange}
          placeholder='Category'
          className='w-full p-2 border rounded'
        />

        <input
          type='text'
          name='subCategory'
          value={form.subCategory}
          onChange={handleChange}
          placeholder='Subcategory'
          className='w-full p-2 border rounded'
        />

        <input
          type='number'
          name='price'
          value={form.price}
          onChange={handleChange}
          placeholder='Price'
          className='w-full p-2 border rounded'
        />

        <input
          type='text'
          name='sizes'
          value={form.sizes.join(', ')}
          onChange={handleChange}
          placeholder='Sizes (comma separated)'
          className='w-full p-2 border rounded'
        />

        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            name='bestseller'
            checked={form.bestseller}
            onChange={handleChange}
          />
          Bestseller
        </label>

        <div className='space-y-2'>
          
          <div className='flex gap-2 mt-2'>
            {form.images.map((img, i) => (
              <img key={i} src={img} alt={`img-${i}`} className='w-16 h-16 object-cover border' />
            ))}
          </div>
        </div>

        <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditProduct
