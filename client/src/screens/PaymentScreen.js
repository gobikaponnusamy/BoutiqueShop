import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import ContactHeader from "../components/ContactHeader";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <ContactHeader />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                name="payment"
                type="radio"
                value="cash-on-deliver"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Cash on deliver</label>
            </div>
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                value="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Credit Card</label>
            </div>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
