import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {
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
    console.log(e);
    setProduct({ 
      ...product, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3003/addproduct', product);
      alert('Product added successfully!');
      navigate('/product');
      // Clear the form
      setProduct({ product_name: '', product_price: '', product_desc: '' });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div class="container">
      <br />
      <h2>ADD PRODUCT</h2>
      <br /><br />
      <form onSubmit={handleSubmit}>
      <div class="mb-3">
              <label class="form-label text-primary">Product Name:</label>
              <input
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                required
                class="form-control"
              />
              <br />
        </div>
        <div class="mb-3">
              <label class="form-label text-primary">Product Price:</label>
              <input
                type="number"
                name="product_price"
                value={product.product_price}
                onChange={handleChange}
                required
                 class="form-control"
              />
        </div>
        <br />
        <div class="mb-3">
            <label class="form-label text-primary">Product Description:</label>
            <textarea
              name="product_desc"
              value={product.product_desc}
              onChange={handleChange}
              required
               class="form-control"
            />
            <br />
        </div>
        <button class="btn btn-primary" type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;