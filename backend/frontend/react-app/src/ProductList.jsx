import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then(res => setProducts(res.data));
  }, []);

  const handleAdd = () => {
    axios.post("http://localhost:5000/api/products", form).then(res => {
      setProducts([...products, res.data]);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`).then(() => {
      setProducts(products.filter(p => p._id !== id));
    });
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Desc" onChange={e => setForm({ ...form, description: e.target.value })} />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ₹{p.price}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
