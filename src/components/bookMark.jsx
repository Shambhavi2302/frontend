import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function BookMark() {
    const [data, setData] = useState([]);
    const [productArrays, setProductArrays] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        
        if(token==null)
        {
            navigate("/")
        }
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/bookmark/65e6b0b63563af8c1a0863e8");
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = [];
                for (let i = 0; i < data.length; i++) {
                    const res = await axios.get(`http://localhost:4000/api/product/getProduct/${data[i].productId}`);
                    fetchedProducts.push(res.data);
                }
                setProductArrays(fetchedProducts);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, [data]);

    return (
        <div>
            <h2>Product Details</h2>
            {productArrays.map((productArray, index) => (
                <div key={index}>
                    <h3>Product Array {index + 1}</h3>
                    {Array.isArray(productArray) ? (
                        productArray.map((product, i) => (
                            <div key={i}>
                                <p>Product Name: {product.productName}</p>
                                <p>Product Price: {product.productPrice}</p>
                                {/* Render other product properties as needed */}
                            </div>
                        ))
                    ) : (
                        <div>
                            {Object.entries(productArray).map(([key, value], i) => (
                                <p key={i}>{key}: {value}</p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <h2 id="login"></h2>
        </div>
    );
}
