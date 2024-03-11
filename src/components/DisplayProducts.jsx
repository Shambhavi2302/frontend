
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { MdDelete } from 'react-icons/md';

export default function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded._id;
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product/getAllProducts', {
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        if (response.data === '') {
          console.log('No products available');
          document.getElementById('availableProducts').innerHTML = 'No Products Available';
        }
        setProducts(response.data);
        setDisplayedProducts(response.data);
        console.log(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/bookmarks/getAllBookmarks/${userId}`);
        const bookmarkMap = {};
        response.data.forEach((bookmark) => {
          bookmarkMap[bookmark.productId] = true;
        });
        setIsBookmarked(bookmarkMap);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      console.log('ID=', id);
      await axios.delete(`http://localhost:4000/api/product/delete/${id}`);
      const filteredProduct = displayedProducts.filter((product) => product._id !== id);
      setDisplayedProducts(filteredProduct);
      console.log('PRoducts info=', products);
      alert(`Product deleted successfully`);
      navigate('/products');

      // Update local storage
      localStorage.setItem('bookmarkicon', JSON.stringify({ ...isBookmarked }));

      // Remove the deleted item from the isBookmarked state
      setIsBookmarked((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    } catch {
      console.log('Error deleting');
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === '') {
      // If search term is empty, display all products
      setDisplayedProducts(products);
    } else {
      // Filter products based on search term entered by user
      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedProducts(filteredProducts);
    }
  };

  const handleBookmark = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/bookmarks/${productId}/${userId}`);
      if (response.data) {
        alert('Product added to Wishlist');
      }
      console.log('Bookmarked prods:', response.data);
      setBookmarks(response.data);

      // Update bookmark state
      setIsBookmarked((prev) => ({
        ...prev,
        [productId]: true,
      }));

      // Save bookmark state in local storage
      localStorage.setItem('bookmarkicon', JSON.stringify({ ...isBookmarked, [productId]: true }));
    } catch (err) {
      alert('Product already present in Wishlist');
    }
  };

  return (
    <>
      <div>
        <form className="d-flex" role="search">
          <label htmlFor="productName" className="form-label" style={{ fontFamily: 'Caveat', fontWeight: 'bold', fontSize: 25 }}>
            Search Product
          </label>
          <input
            type="text"
            className="form-control"
            name="productName"
            style={{ color: 'black', backgroundColor: 'white' }}
            value={searchTerm}
            onChange={handleSearch}
            required="required"
          />
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product, index) => (
              <tr key={product._id}>
                <th>{product.productName}</th>
                <th>{product.productPrice}</th>
                <th>{product.productQuantity}</th>
                <th>{product.productCategory}</th>
                <th>
                  <MdDelete onClick={() => handleDelete(product._id)} />
                </th>
                <th>
                  <button
                    id="wishButton"
                    style={{
                      color: isBookmarked[product._id] ? 'white' : 'black',
                      backgroundColor: isBookmarked[product._id] ? 'red' : 'green',
                    }}
                    onClick={() => handleBookmark(product._id)}
                    disabled={isBookmarked[product._id]}
                  >
                    {isBookmarked[product._id] ? 'Already in Wishlist' : 'Add to Wishlist'}
                  </button>
                </th>
              </tr>
            ))}
            <p id="availableProducts"></p>
          </tbody>
        </table>
        <br /> <br />
      </div>
    </>
  );
}
