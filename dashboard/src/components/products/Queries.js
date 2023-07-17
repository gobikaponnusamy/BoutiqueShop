import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Queries = () => {

  const [searchInput, setInputSearch] = useState("");
  const [querylists, setQuerie] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact")
      .then((response) => {
        console.log(response.data);
        setQuerie(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const deletepro=(e)=>{
    // console.log(e.currentTarget.value);
    axios.delete( `http://localhost:5000/api/contact/${e.currentTarget.value}`);
    axios.get('http://localhost:5000/api/contact')
    .then((response) => {setQuerie(response.data)})
    .catch((error) => {console.log(error)})
   
}
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Queries</h2>
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
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            </div>
          </div>
        </header>

        <div className="card-body">
        <div className="row">
              {querylists.map((x) => (
               <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
               <div className="card card-product-grid shadow-sm p-4" style={{textAlign:"center"}}>
                    <h6>{x.name}</h6>
                   <div className="row">
                     <p>{x.email}</p>
                     <p>{x.subject}</p>
                     <p>{x.message}</p>
                     <p>
  <strong>Query Date:</strong> {(new Date(x.createdAt)).toLocaleDateString()}
</p>
                   </div>
                   <button className="btn-secondary m-3"  value={x._id} onClick={deletepro}>Solve</button>
                 </div>
               </div>
              ))}
            </div>

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

export default Queries;
