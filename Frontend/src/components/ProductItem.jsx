import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); 

  const productImage = Array.isArray(image) && image.length > 0 ? image[0] : "placeholder.jpg";

  return (
    <Link
      to={id ? `/product/${id}` : '#'}
      className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-3"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          className="hover:scale-110 transition-transform ease-in-out duration-300 w-full"
          src={productImage}
          alt={name || "Product"}
        />
      </div>
      <div className="pt-3">
        <p className="text-sm text-gray-600 mb-1 truncate">{name || "No Name"}</p>
        <p className="text-sm font-semibold text-gray-800">
          {currency ? `${currency} ${price}` : "Price Not Available"}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
