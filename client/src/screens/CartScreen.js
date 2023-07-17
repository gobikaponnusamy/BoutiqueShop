import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "./../Redux/Actions/cartActions";
import ContactHeader from "../components/ContactHeader";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };
  return (
    <>
      <ContactHeader />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>QUANTITY</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>PRICE</h6>
                  <h4>₹{item.price}</h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">₹{total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/product" className="col-md-6 ">
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Checkout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
// import React, { useEffect, useState } from "react";
// import Header from "./../components/Header";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removefromcart } from "./../Redux/Actions/cartActions";

// const CartScreen = ({ match, location, history }) => {
//   window.scrollTo(0, 0);
//   const dispatch = useDispatch();
//   const productId = match.params.id;
//   const qty = location.search ? Number(location.search.split("=")[1]) : 1;

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
//   const handlePayment = () => {
//     // Replace with your own logic for handling payments with GPay
//     // This could involve sending a request to a server to initiate the payment process,
//     // displaying a payment dialog to the user, and/or handling the payment result.
//     console.log('Handling payment with GPay');
//   }
//   useEffect(() => {
//     if (productId) {
//       dispatch(addToCart(productId, qty));
//     }
//   }, [dispatch, productId, qty]);

//   const checkOutHandler = () => {
//     // Initialize Google Pay API
//     const paymentsClient = new google.payments.api.PaymentsClient({
//       environment: "TEST",
//     });

//     // Define the payment request object
//     const paymentDataRequest = {
//       apiVersion: 2,
//       apiVersionMinor: 0,
//       allowedPaymentMethods: [
//         {
//           type: "CARD",
//           parameters: {
//             allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
//             allowedCardNetworks: ["MASTERCARD", "VISA"],
//           },
//           tokenizationSpecification: {
//             type: "PAYMENT_GATEWAY",
//             parameters: {
//               gateway: "example",
//               gatewayMerchantId: "exampleGatewayMerchantId",
//             },
//           },
//         },
//       ],
//       merchantInfo: {
//         merchantId: "12345678901234567890",
//         merchantName: "Example Merchant",
//       },
//       transactionInfo: {
//         totalPriceStatus: "FINAL",
//         totalPriceLabel: "Total",
//         totalPrice: total,
//         currencyCode: "INR",
//         countryCode: "IN",
//       },
//       callbackIntents: ["PAYMENT_AUTHORIZATION"],
//     };

//     // Send the payment request
//     paymentsClient.loadPaymentData(paymentDataRequest).then((paymentData) => {
//       // Handle the response
//       console.log("Payment successful!", paymentData);
//       history.push("/login?redirect=shipping");
//     }).catch((err) => {
//       console.error("Payment failed:", err);
//     });
//   };

//   const removeFromCartHandle = (id) => {
//     dispatch(removefromcart(id));
//   };

//   return (
//     <>
//       <Header />
//       {/* Cart */}
//       <div className="container">
//         {cartItems.length === 0 ? (
//           <div className=" alert alert-info text-center mt-3">
//             Your cart is empty
//             <Link
//               className="btn btn-success mx-5 px-5 py-3"
//               to="/"
//               style={{
//                 fontSize: "12px",
//               }}
//             >
//               SHOPPING NOW
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className=" alert alert-info text-center mt-3">
//               Total Cart Products
//               <Link className="text-success mx-2" to="/cart">
//                 ({cartItems.length})
//               </Link>
//             </div>
//             {/* cartiterm */}
//             {cartItems.map((item) => (
//               <div className="cart-iterm row">
//                 <div
//                   onClick={() => removeFromCartHandle(item.product)}>
//                   <i className="fas fa-times"></i>
//                 </div>
//                 <div className="cart-image col-md-3">
//                   <img src={item.image} alt={item.name} />
//                 </div>
//                 <div className="cart-text col-md-5 d-flex align-items-center">
//                   <Link to={`/products/${item.product}`}>
//                     <h4>{item.name}</h4>
//                   </Link>
//                 </div>
//                 <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
//                   <h6>QUANTITY</h6>
//                   <select
//                     value={item.qty}
//                     onChange={(e) =>
//                       dispatch(addToCart(item.product, Number(e.target.value)))
//                     }
//                   >
//                     {[...Array(item.countInStock).keys()].map((x) => (
//                       <option key={x + 1} value={x + 1}>
//                         {x + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
//                   <h6>PRICE</h6>
//                   <h4>₹{item.price}</h4>
//                 </div>
//               </div>
//             ))}

//             {/* End of cart iterms */}
//             <div className="total">
//               <span className="sub">total:</span>
//               <span className="total-price">₹{total}</span>
//             </div>
//             <hr />
//             <div className="cart-buttons d-flex align-items-center row">
//               <Link to="/product" className="col-md-6 ">
//                 <button>Continue To Shopping</button>
//               </Link>
//               {total > 0 && (
//                 <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
//                   <button onClick={checkOutHandler}>Checkout</button>
//                   <button onClick={handlePayment}>Pay with GPay</button>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartScreen;
                    