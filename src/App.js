
import './App.css';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import DisplayProducts from './components/DisplayProducts';
import PageNotFound from './components/PageNotFound';
import BookMark from './components/bookMark';
import WhishList from './components/WhishList';
import Profile from './components/Profile';
import Offers from './components/Offers';

function App() {
  return (
    <>
       <BrowserRouter>
       <Home/>
      
      <Routes>
        <Route path="/contact" element={<ContactUs />}/>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/products" element={<DisplayProducts/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/bookmark" element={<BookMark/>}></Route>
        <Route path="/wishlist" element={<WhishList/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/offers" element={<Offers/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
