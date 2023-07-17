import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { listProduct } from "../Redux/Actions/ProductActions";

const ContactHeader = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [categorylists, setCategoryList] = useState([]);
  const [selectedCategory, setSearch] = useState("");
  const categorysearch = (event) => {
    setSearch(event.target.value);
  };
  console.log(selectedCategory);
  // var filteredProducts = products.filter(
  //   (product) =>product.category === selectedCategory
  // );
  useEffect(() => {
    dispatch(listProduct());
    axios
      .get("http://localhost:5000/api/categories/all")
      .then((response) => {
        console.log(response.data);
        setCategoryList(response.data);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(keyword)
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div>
      {/* Top Header */}
      <nav class="navbar navbar-expand-lg m-3 bg-secondary " style={{ color:"white"}}>
  <div class="container-fluid">
    <Link class="navbar-brand" to="/" style={{color:"white"}} href="#"> <img alt="logo" style={{width:"40px",height:"40px",borderRadius:"10px"}} src="/images/logo.png" /></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon bg-light"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" >
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active "  style={{color:"white",paddingLeft:"20px"}} aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/product"  style={{color:"white",paddingLeft:"20px"}}>Products</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/contactus"  style={{color:"white",paddingLeft:"20px"}}>Contact Us</Link>
        </li>
      </ul>
      <div className="col d-flex align-items-center justify-content-end Login-Register p-2" style={{marginRight:"50px"}}>
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{borderRadius:"10px"}}
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" style={{color:"white"}} to="/profile">
                        Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                        style={{color:"white"}}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register"  style={{color:"white"}}>Register</Link>
                    <Link to="/login"  style={{color:"white"}}>Login</Link>
                  </>
                )}

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"  style={{color:"white"}}></i>
                  <span className="badge" >{cartItems.length}</span>
                </Link>
              </div>
    </div>
  </div>
</nav>

      <div className="header">
        <div className="container">
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

</div>
</div>

);
};

export default ContactHeader;
