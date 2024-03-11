import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ShowBookmarks({bookmarks}) {
    const [product,setProduct] = useState([]);
   useEffect(()=>{
    const fetchProducts = async () =>{
        try{
            const response = await axios.get(`http://localhost:4000/api/product/getProduct/${bookmarks.productId}`)
            //setProduct(response.data);
            setProduct(prevBookmarks => [...prevBookmarks, response.data]);
            console.log("Response in ShowBookMark=",response.data);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    fetchProducts();
   },[bookmarks.productId])
        
   console.log("Products in ShowBookmark",product)
    
  return (
    <div>
     
        {/* {product.map((product,index)=>(
            <h3>{product.productName}</h3>
        ))}
    */}
        
    </div>
  )
}
