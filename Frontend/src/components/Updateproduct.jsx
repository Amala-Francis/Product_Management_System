import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const UpdatedProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    product_name: '',
    product_price: '',
    product_desc: ''
  });

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      // Optional: fetch product by ID in case user refreshes page
      axios.get(`http://localhost:3003/getproduct/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error("Fetch failed:", err));
    }
  }, [location.state, id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3003/updateproduct/${id}`, product);
      alert('Product updated successfully!');
      navigate('/product'); // Go back to the product list
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="container mt-4">
      <br />
      <h2>UPDATE PRODUCT</h2>
      <br /><br />
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label text-primary">Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            required
            className="form-control"
          />
          <br />
        </div>
        <div className="mb-3">
          <label className="form-label text-primary">Product Price:</label>
          <input
            type="number"
            name="product_price"
            value={product.product_price}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <br />
        <div className="mb-3">
          <label className="form-label text-primary">Product Description:</label>
          <textarea
            name="product_desc"
            value={product.product_desc}
            onChange={handleChange}
            required
            className="form-control"
          />
          <br />
        </div>
        <button className="btn btn-primary me-3" type="submit">Update Product</button>
        <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdatedProduct;