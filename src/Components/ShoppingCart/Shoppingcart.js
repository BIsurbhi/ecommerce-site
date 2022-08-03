import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DLT, REMOVE, ADD, ADD_WISHLIST } from "../../redux/actions/actions";
import "./ShoppingCart.css";
import { Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

function Shoppingcart() {
  const [price, setPrice] = useState(0);
  const [newprice, setNewprice] = useState(0);

  const getdata = useSelector((state) => state.cartreducer.carts);

  const dispatch = useDispatch();

  const decrement = (e) => {
    dispatch(REMOVE(e));
  };
  const increment = (e) => {
    dispatch(ADD(e));
  };

  const deleteitem = (e) => {
   
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result ) => {
        if (result.isConfirmed) {
            dispatch(DLT(e.id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
  }
  

  const wishitem = (e) => {
    dispatch(ADD_WISHLIST(e));
    dispatch(DLT(e.id));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item Added to Cart",
      showConfirmButton: false,
      timer: 700,
    });
  };

  const rate = () => {
    let rate = 20;
    let totalrate = 0;
    totalrate = price - rate;

    setNewprice(totalrate);
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
    rate();
  }, [total]);

  return (
    <div>
      {/* <nav class="navbar navbar-light ">
  <a className="navbar-brand logo animate-charcter" href="/">MY begs</a>
</nav> */}
      {getdata.length ? (
        <>
          <div className="container" style={{ marginTop: "6rem" }}>
            <h4>Cart Items</h4>
            <div className="row">
              <div className="col-lg-8 col-md-12 mb-4 mb-lg-0 border">
                {getdata.map((e) => {
                  return (
                    <>
                      <div className="row">
                        <div
                          className="col-lg-4 col-md-4 mb-3 mb-lg-0"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={e.image}
                            style={{
                              width: "15rem",
                              height: "15rem",
                              paddingTop: "4rem",
                            }}
                            alt=""
                          />
                        </div>

                        <div className="col-lg-8 col-md-8 mb-2 mb-lg-0">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "4rem",
                              paddingTop: "5rem",
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: "bold" }}>{e.name}</div>
                              <div style={{ paddingTop: "1rem" , display:'flex'}}>
                                Qty: <div style={{marginLeft:'10px'}}>
                                <button className='design' onClick={()=>increment(e)}>+</button> { e.qnty } <button className='design' onClick={()=>decrement(e)}>-</button>
                                </div>
                              </div>
                              <div style={{ paddingTop: "1rem" }}>
                                Price: Rs.{e.price}
                              </div>
                            </div>
                            <div>
                              <Button
                                variant="dark"
                                style={{
                                  fontSize: "15px",
                                  borderRadius: "0px",
                                }}
                                onClick={() => wishitem(e)}
                              >
                                Add to WishList
                              </Button>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "4rem",
                              paddingTop: "0px",
                              paddingBottom: ".5rem",
                            }}
                          >
                            <p
                              variant="dark"
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                              onClick={() => deleteitem(e)}
                            >
                              <AiFillDelete style={{ marginRight: "5px" }} />
                              Remove
                            </p>
                            <p className="free">Free Delivery</p>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}
              </div>
              <div
                className="col-lg-3 col-md-12 mb-4 mb-lg-0 gap"
                style={{
                  background: "rgb(230, 230, 230)",
                  height: "0vh",
                  fontWeight: "500px",
                }}
              >
                <div style={{ position: "fixed" }}>
                  <h3 style={{ paddingTop: "6px" }}>Price Detail</h3>
                  <hr />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <input
                      className="coupen"
                      type="text"
                      placeholder=" Enter Coupon Code"
                    />
                    <Button
                      variant="dark"
                      style={{ fontSize: "15px", borderRadius: "0px" }}
                    >
                      Apply
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "1rem",
                    }}
                  >
                    <p>Price:</p>
                    <p>Rs. {price}</p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ color: "green" }}>Discount:</p>
                    <p style={{ color: "green" }}> - Rs. 20</p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ color: "green" }}>Delivery Charge:</p>
                    <p style={{ color: "green" }}>Free</p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ color: "green" }}>Coupon Offer:</p>
                    <p style={{ color: "green" }}>None</p>
                  </div>

                  <hr />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Amount Pay:</p>
                    <p>Rs. {newprice}</p>
                  </div>
                  <hr />
                  <div>
                    <div>
                      <h4 style={{ padding: "4px" }}>Payment Mode</h4>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        paddingBottom: "1rem",
                      }}
                    >
                      <Button
                        variant="dark"
                        style={{ fontSize: "15px", borderRadius: "0px" }}
                        // onClick={() => setSmShow(true)}
                        className="me-2"
                      >
                        Pay Online
                      </Button>
                      <Button
                        variant="dark"
                        style={{ fontSize: "15px", borderRadius: "0px" }}
                      >
                        Cash On Delivery
                      </Button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="empty">
            <h1>Your cart is Empty</h1>
            <img src="./7Hrr.gif" width="40%" height="20%" alt="" />
          </div>
        </>
      )}
    </div>
  );
}

export default Shoppingcart;
