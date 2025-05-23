import React, { useState } from "react";

const PaymentModal = ({
  isOpen,
  onClose,
  coursePrice,
  discountAmount = 0,
  onApplyCoupon,
  couponError,
  onPaypalPay,
  onStripePay,
}) => {
  const [coupon, setCoupon] = useState("");

  if (!isOpen) return null;

  const finalAmount = (coursePrice - discountAmount).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-xs flex flex-col items-center relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Choose Payment Method
        </h2>
        {/* Coupon Section */}
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />
          <button
            className="w-full bg-blue-200 text-blue-800 py-1 rounded hover:bg-blue-300 transition"
            onClick={() => onApplyCoupon(coupon)}
            type="button"
          >
            Apply Coupon
          </button>
          {couponError && (
            <p className="text-red-500 text-xs mt-1">{couponError}</p>
          )}
        </div>
        <div className="w-full mb-4 text-center">
          <span className="font-semibold">Amount to Pay: </span>
          <span className="text-lg font-bold">${finalAmount}</span>
        </div>
        {/* PayPal Payment Section */}
        <button
          className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
          onClick={() => onPaypalPay(finalAmount)}
        >
          Proceed to PayPal
        </button>
        {/* Stripe Payment Section */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={() => onStripePay(finalAmount)}
        >
          Pay with Stripe
        </button>
        <button
          className="w-full mt-2 text-blue-600 underline"
          onClick={onClose}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;