import axios from 'axios'
import React, { useState } from 'react'
import { useUser } from './context/userContext'

export default function AddProduct() {

    const { isAdmin } = useUser();
    const baseUrl = "http://localhost:4000/api/product/addProduct";

    const [product, setProduct] = useState({
        productName : "",
        productPrice : 0,
        productQuantity : 0,
        productCategory : ""
    })

    const handleProductChange = (e) =>{
        let newProduct = {...product};
        newProduct[e.target.name] = e.target.value;
        setProduct(newProduct);
    }

    const handleProductSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(baseUrl,product);

        if(response.status === 201)
        {
            alert("Product added Successfully")
        }
        else
        {
            alert("Failed to add Product")
        }
    }

  return (
    <>
    { isAdmin ? (
         <div className="container mt-5">
         <div className="row justify-content-center">
             <div className="col-md-6">
                 <div className="card">
                     <div className="card-header">
                        Add Product
                     </div>
                     <div className="card-body">
                         <form>
                             <div className="mb-3">
                                 <label htmlFor="productName" className="form-label">Name</label>
                                 <input type="text" className="form-control" name="productName" onChange={handleProductChange} required="required"/>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="productPrice" className="form-label">Price</label>
                                 <input type="number" className="form-control"  name="productPrice"  onChange={handleProductChange} required="required"/>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="productQuantity" className="form-label">Quantity</label>
                                 <input type="number" className="form-control"  name="productQuantity"  onChange={handleProductChange} required="required"/>
                             </div>
                             <div className="mb-3">
                                 <label htmlFor="productCategory" className="form-label">Category</label>
                                 <input type="text" className="form-control"  name="productCategory"  onChange={handleProductChange} required="required"/>
                             </div>
                             <div className="d-grid gap-2">
                                 <button type="submit" className="btn btn-primary" onClick={handleProductSubmit}>Add Product</button>
                                
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
       
     </div>
    ) : (
        <h1 style={{textAlign:"center"}}>Not authorized. Login as ADMIN to continue!!!</h1>
    )}
    </>
   
  )
}
