import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { MdDelete } from "react-icons/md";

export default function WhishList() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("Token=",token)
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);


  const [product, setProduct] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        if(token)
        {
          const decoded = jwtDecode(token);
          const userId = decoded._id;
        

        const response = await axios.get(`http://localhost:4000/api/bookmarks/getAllBookmarks/${userId}`);
        if(response.data=="")
      {
        document.getElementById("items").innerHTML="No products in wishlist"
      }

        const tempProducts = [];
  
        for (const bookmark of response.data) {
          const res = await axios.get(`http://localhost:4000/api/product/getProduct/${bookmark.productId}`);

          tempProducts.push(res.data);
        }
  
        setProduct(tempProducts);}
        else
        {
          console.log("No token")
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData();
  }, []);
  
  const handleDelete = async (id) =>{
    try{
     await axios.delete(`http://localhost:4000/api/bookmarks/remove/${id}`)
      // if(res.data=="")
      // {
      //   document.getElementById("items").innerHTML = "No items in wishlist"
      // }
      const filteredProduct = product.filter((product) => product._id !== id);
      
      setProduct(filteredProduct); 
    }
    catch(err)
    {
      console.log("Error deleting product:",err)
    }
  }

  return (

    <div class="container">
  <h2>Wishlist</h2>
  <table class="table table-striped table-bordered">
    <thead class="thead-dark">
      <tr>
       
        <th>Product Name</th>
        <th>Product Price</th>
      </tr>
    </thead>
    <tbody>
      
    {product.map((product,index)=>(
      <tr>
        <td>{product.productName}</td>
        <td>{product.productPrice}</td>
        <td><MdDelete onClick={()=>handleDelete(product._id)}/></td>
        </tr>
      ))}
   
    </tbody>
   
  </table>
  <h4 id="items"></h4>
</div>
  )
}
