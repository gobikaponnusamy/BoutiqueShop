import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const [searchInput, setInputSearch] = useState("");
  const [selectedCategory, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [categorylists, setCategoryList] = useState([]);
  useEffect(() => {
    dispatch(listProducts());
    axios
      .get("http://localhost:5000/api/categories/all")
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => console.log(error));
  }, [dispatch, successDelete]);

  const categorysearch = (event) => {
    setSearch(event.target.value);
  };

  var filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
  );

  if (price === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (price === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto col-md-2">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                value={searchInput}
                onChange={(e) => setInputSearch(e.target.value)}
              />
              {/* <button onClick={inputSearchFilter} className="btn btn-dark">
                Search
              </button> */}
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={categorysearch}>
                <option value="">All category</option>
                {categorylists.map((category, index) => (
                  <option value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
                {/* <option value="cloth">Clothings</option>
                <option value="stationary">Stationary</option>
                <option value="bed">Beds</option> */}
                {}
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="">Sort-by-order</option>
                <option value="low-high">Cheap first</option>
                <option value="high-low">High Price First</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {filteredProducts.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
