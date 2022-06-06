import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { addToCartApi, removeFromCart } from "../features/cartSlice";

function CartScreen() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useParams();
  const location = useLocation();
  useEffect(() => {
    const qty =
      location.search.length > 0 ? Number(location.search.split("=")[1]) : 0;
    //console.log(qty);
    if (router.id) {
      dispatch(addToCartApi({ id: router.id, qty: qty }));
    }
  }, [location]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    //console.log("remove");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCartApi({
                            id: item.product,
                            qty: Number(e.target.value),
                          })
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <h1>
            Your Cart is empty <Link to="/">Go Back</Link>{" "}
          </h1>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
              </h2>
              ${cartItems.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-full btn-block"
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
