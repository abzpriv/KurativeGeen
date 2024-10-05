'use client';
import { useState } from 'react';
import Image from 'next/image';
import paymentImage from '../assets/paymentImage.jpg';
import bankIcon from '../assets/bankIcon.png';
import dailyPinkImage from '../assets/ImageDailyPink.png';
import familyImage from '../assets/ImageFamily.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  nearestLocation: Yup.string().required('Nearest Location is required'),
  postalCode: Yup.string().required('Postal Code is required'),
  city: Yup.string().required('City is required'),
});


const cartItems = [
  {
    id: 1,
    name: 'Xtreme',
    image: familyImage,
    price: 1500,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Daily Pink',
    image: dailyPinkImage,
    price: 1500,
    quantity: 1,
  },
];

// Shipping charges
const shippingCharges = 200;

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank'>('cash');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Calculate the total price and subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCharges;
  const orderID = "#12345";

   const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      nearestLocation: '',
      postalCode: '',
      city: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setMessage('');
      try {
        const response = await fetch('/api/sendOrderConfirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            orderID,
            subtotal,
            total,
            shippingCharges,
            cartItems,
          }),
        });

        if (response.ok) {
          setMessage('Order confirmation email sent successfully!');
          formik.resetForm(); // Reset form fields
        } else {
          setMessage('Error sending order confirmation email');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section>
      <section></section>
    <div className="bg-gradient-to-r from-white via-gray-100 to-green-50 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden max-w-6xl mx-auto p-8 md:p-12 space-y-8 md:space-y-0 md:space-x-12 items-center justify-center border border-gray-200">
        
        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-green-700 mb-8 text-center md:text-left tracking-tight">Choose Payment Method</h2>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`flex-1 py-4 rounded-full font-semibold text-lg shadow-md transition-transform transform hover:scale-105 ${
                paymentMethod === 'cash' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Cash on Delivery
            </button>
            <button
              onClick={() => setPaymentMethod('bank')}
              className={`flex-1 py-4 rounded-full font-semibold text-lg shadow-md transition-transform transform hover:scale-105 ${
                paymentMethod === 'bank' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Bank Transfer
            </button>
          </div>

          {/* Cash on Delivery Form */}
          {paymentMethod === 'cash' && (
            <>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Full Name Field */}
      <div>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className={`w-full p-4 bg-white/80 border ${
            formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-green-500 transition`}
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.fullName}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`w-full p-4 bg-white/80 border ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-green-500 transition`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
        )}
      </div>

      {/* Phone Number Field */}
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className={`w-full p-4 bg-white/80 border ${
            formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-green-500 transition`}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.phone}</p>
        )}
      </div>

      {/* Address Field */}
      <div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className={`w-full p-4 bg-white/80 border ${
            formik.touched.address && formik.errors.address ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-green-500 transition`}
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.address && formik.errors.address && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.address}</p>
        )}
      </div>

      {/* Nearest Location Field */}
      <div>
        <input
          type="text"
          name="nearestLocation"
          placeholder="Nearest Location"
          className={`w-full p-4 bg-white/80 border ${
            formik.touched.nearestLocation && formik.errors.nearestLocation ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-green-500 transition`}
          value={formik.values.nearestLocation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.nearestLocation && formik.errors.nearestLocation && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.nearestLocation}</p>
        )}
      </div>

      {/* Postal Code and City Fields */}
      <div className="grid grid-cols-2 gap-4">
        {/* Postal Code */}
        <div>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            className={`p-4 bg-white/80 border ${
              formik.touched.postalCode && formik.errors.postalCode ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-green-500 transition`}
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.postalCode && formik.errors.postalCode && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.postalCode}</p>
          )}
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            className={`p-4 bg-white/80 border ${
              formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-green-500 transition`}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.city}</p>
          )}
        </div>
      </div>

      {/* Product Summary Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4 p-4 bg-green-50 rounded-lg shadow-lg">
            <Image src={item.image} alt={item.name} width={70} height={70} className="rounded-lg border-2 border-green-200" />
            <div className="ml-4 flex-1">
              <p className="text-lg font-semibold text-green-900">{item.name}</p>
              <p className="text-sm text-green-700">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-green-900">{item.price} PKR</p>
            </div>
          </div>
        ))}
        <div className="mt-4">
           <p className="text-lg font-medium text-green-700 flex justify-between">
    Order ID: <span className="font-semibold">{orderID}</span>
  </p>
          <p className="text-lg font-medium text-green-700 flex justify-between">Shipping Charges: <span className="font-semibold">{shippingCharges} PKR</span></p>
          <p className="text-lg font-medium text-green-700 flex justify-between">
            Subtotal: <span className="font-semibold">{Math.round(subtotal)} PKR</span>
          </p>
          <p className="text-xl font-bold text-green-900 flex justify-between">
            Total: <span>{Math.round(total)} PKR</span>
          </p>
        </div>
      </div>

      <button
                  type="submit"
                  className="w-full py-4 bg-green-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm Order'}
                </button>

                {/* Message after submission */}
                {message && <p className="text-center text-green-600">{message}</p>}
    </form>
            </>
          )}
          
          {/* Bank Transfer Info */}
          {paymentMethod === 'bank' && (
  <>
    <div className="bg-green-50 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-green-700 mb-4">Bank Transfer Details</h3>
      <div className="flex items-center mb-4">
        <Image src={bankIcon} alt="Bank Icon" width={40} height={40} className="mr-4" />
        <p className="text-lg font-medium text-gray-700">Bank Name: ABC Bank</p>
      </div>
      <p className="text-lg text-gray-700 mb-2">
        Account Number: <span className="font-semibold">1234 5678 9101 1121</span>
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Account Holder Name: <span className="font-semibold">John Doe</span>
      </p>
      {/* WhatsApp Contact Information */}
      <div className="mb-4">
        <p className="text-lg font-medium text-red-700 mb-1">Send Screenshot after Payment on WhatsApp</p>
        <p className="text-lg font-semibold text-gray-800">+92 300 1234567</p>
      </div>
      <div className="mb-4">
  <p className="text-lg font-medium text-red-700 mb-1">
    After Payment, send address details on WhatsApp
  </p>
  
  {/* Bullet Points Section */}
  <ul className="list-disc list-inside pl-5 space-y-2">
    <li className="text-lg font-semibold text-gray-800">
      Full Name
    </li>
    <li className="text-lg font-semibold text-gray-800">
      Email
    </li>
    <li className="text-lg font-semibold text-gray-800">
      Phone Number
    </li>
    <li className="text-lg font-semibold text-gray-800">
      Address
    </li>
    <li className="text-lg font-semibold text-gray-800">
      Nearest Location
    </li>
    <li className="text-lg font-semibold text-gray-800">
      Postal Code
    </li>
    <li className="text-lg font-semibold text-gray-800">
      City
    </li>
  </ul>
</div>

      {/* Input for Screenshot Upload
      <div className="mt-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">Upload Payment Screenshot:</label>
        <input type="file" accept="image/*" className="border-2 border-green-300 rounded-lg p-2 w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500" />
        <p className="text-sm text-gray-500 mt-1">*Please upload a clear screenshot of your payment.</p>
      </div> */}
    </div>

    {/* Product Summary Section */}
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-green-700 mb-4">Order Summary</h3>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-4 p-4 bg-green-50 rounded-lg shadow-lg">
          <Image src={item.image} alt={item.name} width={70} height={70} className="rounded-lg border-2 border-green-200" />
          <div className="ml-4 flex-1">
            <p className="text-lg font-semibold text-green-900">{item.name}</p>
            <p className="text-sm text-green-700">Quantity: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-green-900">{item.price} PKR</p>
          </div>
        </div>
      ))}
      <div className="mt-4">
         <p className="text-lg font-medium text-green-700 flex justify-between">
    Order ID: <span className="font-semibold">{orderID}</span>
  </p>
        <p className="text-lg font-medium text-green-700 flex justify-between">Shipping Charges: <span className="font-semibold">{shippingCharges} PKR</span></p>
        <p className="text-lg font-medium text-green-700 flex justify-between">
          Subtotal: <span className="font-semibold">{Math.round(subtotal)} PKR</span>
         </p>
      <p className="text-xl font-bold text-green-900 flex justify-between">
       Total: <span>{Math.round(total)} PKR</span>
      </p>

      </div>
    </div>
  </>
)}

          
        </div>

        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <Image src={paymentImage} alt="Payment Illustration" width={500} height={500} className="object-cover rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
    </section>
  );
};

export default Payment;
