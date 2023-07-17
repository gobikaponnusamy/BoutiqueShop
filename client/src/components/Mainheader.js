import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";

const Mainheader = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    <div style={{backgroundImage:`url("https://images.pexels.com/photos/1827130/pexels-photo-1827130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,backgroundRepeat:"no-repeat",backgroundSize:"cover" ,height:"100vh",width:"100%",position:"relative",objectFit:"cover"}} class="m-0">
      {/* Top Header */}
      <div >

      <nav class="navbar navbar-expand-lg p-2.5 bg-secondary" style={{color:"white",borderRadius:"1px"}}>
     
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
        {/* <li class="nav-item dropdown">
          <Link class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"  style={{color:"white",paddingLeft:"20px"}}>
            Services
          </Link>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link class="dropdown-item" to="/">Action</Link></li>
            <li><Link class="dropdown-item" to="/">Another action</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><Link class="dropdown-item" to="/">Something else here</Link></li>
          </ul>
        </li> */}
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
</div>

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
                {/* <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div> */}
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header" >
          
            
            <div >
                {/* <div className="col-12" style={{padding:"100px",fontFamily:"sans-serif",fontSize:"200px",textAlign:"center",backgroundColor:"white"}}> */}
                <div className="hero" style={{position:"absolute",bottom:"25%",left:"28%"}}>
                <h1 style={{textAlign:"center",fontSize:"3rem",fontWeight:"800",color:"white",textShadow:"2px 2px 4px #000000"}}>Fashions fade, style is eternal.</h1>
                <br></br>
                <p  style={{color:"#eeee",textAlign:"center",fontSize:"1.3rem",fontWeight:"700",padding:"0rem 0 2rem 0",textShadow:"2px 2px 4px #000000"}}>Choose your Products</p>
                <a href="/product"style={{display:"flex",justifyContent:"center",textDecoration:"none",backgroundColor:"white",borderRadius:"6px",fontSize:"1.1rem",fontWeight:"bold",letterSpacing:"2px",color:"#222",width:"150px",padding:"9px",marginLeft:"250px"}}>Explore now</a>
                </div>
              
            </div>
            
</div>

</div>
</div>
</div>
);
};

export default Mainheader;
