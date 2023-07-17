import React, { useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useSelector } from "react-redux";

const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const [searchorder, setSearchOrder] = useState("");
  const [searchpaidstatus, setSearchPaidStatus] = useState("");
  const [searchdeleiverdstatus, setSearchDeliveredStatus] = useState("");
  const [show, setShow] = useState(10);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search by name..."
                className="form-control p-2"
                value={searchorder}
                onChange={(e) => setSearchOrder(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setSearchPaidStatus(e.target.value)}
              >
                <option value="">Paid Status</option>
                <option value="paid">Paid</option>
                <option value="not-paid">Not Paid</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setSearchDeliveredStatus(e.target.value)}
              >
                <option value="">Delivered Status</option>
                <option value="delivered">Delivered</option>
                <option value="not-delivered">Not Delivered</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                onChange={(e) => setShow(e.target.value)}
              >
                <option value="20">Show less than 20</option>
                <option value="30">Show less than 30</option>
                <option value="40">Show less than 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders
                orders={orders}
                searchorder={searchorder}
                searchpaidstatus={searchpaidstatus}
                searchdeleiverdstatus={searchdeleiverdstatus}
                show={show}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
