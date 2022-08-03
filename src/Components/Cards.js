import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import products from "./Cardsdata";
import "./styles.css";
import { BsHeart, BsShareFill, BsArrowsFullscreen } from "react-icons/bs";
import Swal from "sweetalert2";
import "animate.css";
import { useDispatch } from "react-redux";
import { ADD, ADD_WISHLIST } from "../redux/actions/actions";
import Modal from "react-bootstrap/Modal";
import Zoom from "react-medium-image-zoom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "react-medium-image-zoom/dist/styles.css";
import Slick from "./Slick";

const Cards = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(products);

  const [view, setView] = useState("");

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  function handleShow(e) {
    console.log(e);
    setView(e);
    setFullscreen(e);
    setShow(true);
  }

  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item add to cart",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const sendwish = (e) => {
    dispatch(ADD_WISHLIST(e));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Item add to WishList",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const filterItems = (cateItem) => {
    const updatedItems = products.filter((currelement) => {
      return currelement.category === cateItem;
    });
    setItem(updatedItems);
  };

  return (
    <div className="container mt-3">
      <h2
        className="text-center"
        style={{ marginTop: "5rem", fontFamily: "Noto Serif" }}
      >
        All Collections
      </h2>

      <div className="shown">Choose By Category</div>
      <div className="category">
        <p onClick={() => filterItems("mens")} className="catbtn">
          Mens
        </p>
        <p onClick={() => filterItems("women")} className="catbtn">
          Womens
        </p>
        <p onClick={() => filterItems("travel")} className="catbtn">
          Travel
        </p>
        <p onClick={() => filterItems("backpack")} className="catbtn">
          Backpacks
        </p>
        <p onClick={() => setItem(products)} className="catbtn">
          All
        </p>
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        {item.map((element, id) => {
          return (
            <>
              <Card
                style={{
                  width: "22rem",
                  border: "none",
                  background: "rgb(230,230,230)",
                }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.image}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "16px",
                    width: "20px",
                  }}
                >
                  <div className="dot">
                    <BsHeart
                      title="wishlist"
                      className="place"
                      onClick={() => sendwish(element)}
                    />
                  </div>

                  <div className="animate__animated animate__fadeInRight sideicon">
                    <div className="dot">
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <BsShareFill className="place" />
                      </OverlayTrigger>
                    </div>

                    <div className="dot">
                      <BsArrowsFullscreen
                        title="full view"
                        className="me-2 mb-2 place"
                        onClick={() => handleShow(element)}
                      />
                    </div>
                  </div>
                </div>

                <Card.Body>
                  <div className="button_div d-flex justify-content-center animate__animated animate__fadeInUp">
                    <Button
                      style={{ borderRadius: "0px" }}
                      className="col-lg-12 btnstyle"
                      variant="dark"
                      onClick={() => send(element)}
                    >
                      Add To Cart
                    </Button>
                  </div>

                  <Card.Title
                    style={{ marginTop: "3rem", textAlign: "center" }}
                  >
                    {element.name}
                  </Card.Title>
                  <Card.Text
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Rs.{element.price}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Modal
                show={show}
                fullscreen={fullscreen}
                onHide={() => setShow(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{view.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-lg-5 col-md-5 mb-4 mb-lg-0 ">
                        <Zoom>
                          <img
                            src={view.image}
                            alt=""
                            style={{ marginLeft: "-50px" }}
                            width="100%"
                          />
                        </Zoom>
                      </div>

                      <div
                        className="col-lg-7 col-md-7 mb-4 mb-lg-0"
                        style={{ paddingLeft: "2rem" }}
                      >
                        <div className="item">
                          <h1>{view.name}</h1>
                        </div>
                        <div className="itemdetail">
                          <p>{view.description}</p>
                        </div>
                        <div>
                          <h5>Price: Rs. {view.price}</h5>
                        </div>

                        <div>
                          <Button
                            style={{ borderRadius: "0px", marginTop: "2rem" }}
                            variant="dark"
                            className=" btnstyle1"
                            onClick={() => send(view)}
                          >
                            Add To Cart
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* <div className="row d-flex justify-content-center align-items-center">
                      <h4 style={{ marginTop: "3rem", marginLeft: "2rem" }}>
                        More Products You Like
                      </h4>
                      <Slick/>
                    </div> */}
                  </div>
                </Modal.Body>
              </Modal>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
