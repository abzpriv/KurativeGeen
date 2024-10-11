'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; 
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
interface CartItem {
  productID: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

interface Order {
  orderID: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  nearestLocation: string;
  postalCode: string;
  city: string;
  status: string;
  subtotal: number;
  total: number;
  shippingCharges: number;
  createdAt: string;
  cartItems: CartItem[];
  
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
      const router = useRouter(); 


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orderHistory');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setShowConfirmation(false);
  };

  const handleStatusChange = () => {
  setShowConfirmation(true);
};


 const confirmStatusChange = async () => {
  if (selectedOrder) {
    try {
      const response = await fetch('/api/updateOrderStatus', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: selectedOrder.orderID,
          status: 'Delivered',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status'); 
      }

      const updatedOrder = await response.json();
      console.log('Order updated successfully:', updatedOrder);

      const emailResponse = await fetch('/api/sendEmail', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: selectedOrder.email,
          orderID: selectedOrder.orderID,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email'); 
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderID === selectedOrder.orderID
            ? { ...order, status: 'Delivered' }
            : order
        )
      );

      setSelectedOrder((prevSelectedOrder) =>
        prevSelectedOrder ? { ...prevSelectedOrder, status: 'Delivered' } : prevSelectedOrder
      );

      setShowConfirmation(false);
    } catch (error) {
      console.error('Error updating order status or sending email:', error);
    }
  }
};
 const handleLogout = () => {
    console.log('User logged out');
    localStorage.clear();
    
    router.push('/admin-login'); 
};

  return (
    <div className="p-10 bg-white min-h-screen shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-black">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <AiOutlineLogout className="mr-2" /> Logout
        </button>
      </div>
      <h2 className="text-3xl font-semibold text-black text-center mb-8">Order History</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent border border-green-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-300">
              <th className="py-4 px-6 border-b border-green-400 text-left text-black">Order ID</th>
              <th className="py-4 px-6 border-b border-green-400 text-left text-black">Customer Name</th>
              <th className="py-4 px-6 border-b border-green-400 text-left text-black">Email</th>
              <th className="py-4 px-6 border-b border-green-400 text-left text-black">Status</th>
              <th className="py-4 px-6 border-b border-green-400 text-left text-black">Total</th>
              <th className="py-4 px-6 border-b border-green-400 text-left text-black">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderID}
                className="p-4 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(order)} 
              >
                <td className="py-4 px-6 border-b border-green-300 text-black">{order.orderID}</td>
                <td className="py-4 px-6 border-b border-green-300 text-black">{order.fullName}</td>
                <td className="py-4 px-6 border-b border-green-300 text-black">{order.email}</td>
                <td
                 className={`py-4 px-6 border-b border-green-300 ${
                   order.status === 'Delivered' ? 'text-green-600' : 'text-red-600'
                  }`}
                 >
               {order.status || 'Pending'}
                </td>
                <td className="py-4 px-6 border-b border-green-300 text-black">{order.total.toFixed(2)} PKR</td>
                <td className="py-4 px-6 border-b border-green-300 text-black">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* Modal for Order Details */}
{isModalOpen && selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        <AiOutlineClose size={24} />
      </button>
      <h2 className="text-3xl font-bold mb-6 text-black">Order Details</h2>
      <div className="flex">
        {/* Order Details Section */}
        <div className="flex-1 space-y-4 pr-4">
          <div className="flex justify-between">
            <span className="font-semibold text-black">Order ID:</span>
            <span className="text-black">{selectedOrder.orderID}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Customer Name:</span>
            <span className="text-black">{selectedOrder.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Email:</span>
            <span className="text-black">{selectedOrder.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Phone:</span>
            <span className="text-black">{selectedOrder.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Address:</span>
            <span className="text-black">{selectedOrder.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Nearest Location:</span>
            <span className="text-black">{selectedOrder.nearestLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Postal Code:</span>
            <span className="text-black">{selectedOrder.postalCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">City:</span>
            <span className="text-black">{selectedOrder.city}</span>
          </div>
        <div className="flex justify-between">
                  <span className="font-semibold text-black">Status:</span>
                  <div className="relative">
                    {selectedOrder.status === 'Delivered' ? (
                      <span className="text-green-600">Delivered</span>
                    ) : (
                      <button
                  onClick={handleStatusChange}
               className="bg-red-500 text-white p-2 rounded"
                 >
                Mark as Delivered
               </button>

                    )}
                  </div>
                </div>
              
            {/* Confirmation Dialog */}
            {showConfirmation && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <p className="mb-4 text-lg text-black">Are you sure the product has been delivered?</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={confirmStatusChange}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
         
          <div className="flex justify-between">
            <span className="font-semibold text-black">Subtotal:</span>
            <span className="text-black">{selectedOrder.subtotal.toFixed(2)} PKR</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Shipping Charges:</span>
            <span className="text-black">{selectedOrder.shippingCharges.toFixed(2)} PKR</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Total:</span>
            <span className="text-black">{selectedOrder.total.toFixed(2)} PKR</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-black">Date:</span>
            <span className="text-black">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="border-l border-gray-300 mx-4" />

        {/* Product Details Section */}
        <div className="flex-1 space-y-4 pl-4">
          <h3 className="text-xl font-semibold text-black">Product Details</h3>
          {selectedOrder.cartItems.map((item: CartItem) => (
            <div key={item.productID} className="flex items-center justify-between border-b py-2">
              <Image 
                src={item.image} 
                alt={item.name} 
                width={64} 
                height={64} 
                className="object-cover rounded" 
              />
              <div className="flex-1 ml-4 flex justify-between">
                <span className="text-black">{item.name}</span>
                <span className="text-black">
                  {item.quantity} x {typeof item.price === 'number' ? item.price.toFixed(2) : 'Invalid Price'} PKR
                </span>
              </div>
            </div>
          ))}
          {/* Total Quantity */}
          <div className="flex justify-between font-semibold text-black">
            <span>Total Quantity:</span>
            <span>
              {selectedOrder.cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default OrderHistory;
