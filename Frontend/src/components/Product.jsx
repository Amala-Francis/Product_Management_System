import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // To track the product being edited
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = () => {
    axios.get("http://localhost:3003/getproduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Network Error:', error);
      });
  };

  
  // Update handler
  const handleUpdate = (product) => {
    navigate(`/update/${product._id}`, { state: { product } });
  };

  // DELETE handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/deleteproduct/${id}`);
      alert("Product deleted");
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <div className="content-wrapper">
        <h2 className="text-center mb-4">PRODUCT LIST</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
            <th>Name</th><th>Price</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.product_name}</td>
              <td>{p.product_price}</td>
              <td>{p.product_desc}</td>
              <td>
                <button className="btn btn-success me-2" onClick={() => handleUpdate(p)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};
export default Product;