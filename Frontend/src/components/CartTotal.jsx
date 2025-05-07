import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const gstRate = 0.18;
  const gstCharge = parseFloat((subtotal * gstRate).toFixed(2));
  const deliveryFee = subtotal === 0 ? 0.00 : parseFloat(delivery_fee.toFixed(2));
  const totalAmount = subtotal + gstCharge + deliveryFee;
  
  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-4 text-base text-gray-700 font-medium">
        <div className="flex justify-between">
          <span>Base Price</span>
          <span>{currency} {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>{currency} {gstCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>{currency} {subtotal==0 ? 0.00:delivery_fee.toFixed(2)}</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Total Amount</span>
          <span>{currency} {totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
