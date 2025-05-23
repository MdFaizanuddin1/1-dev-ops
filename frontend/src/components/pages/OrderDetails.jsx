import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../routes/routes";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/order/get`, {
          withCredentials: true,
        });
        setOrders(response.data.data);
      } catch (err) {
        setError(`Failed to fetch orders", ${err.response.data.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (orders.length === 0)
    return (
      <div className="text-center text-gray-500 text-lg">No orders found.</div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Order Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) =>
          order.products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={product.productId.image[0]}
                alt={product.productId.productName}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">
                  {product.productId.productName}
                </h2>
                <p className="text-gray-700">Quantity: {product.quantity}</p>
                <p className="text-gray-700">
                  Price: ₹{product.productId.price}
                </p>
                <p className="text-gray-700">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={`mt-2 font-semibold ${
                    order.status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
