import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { userLogin } from "../features/userSlice";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { isLoading, userInfo } = useSelector((state) => state.user);
  const redirect = "";
  useEffect(() => {
    console.log(location);
    if (userInfo) {
      nav("/");
    }
  }, [nav, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ?
          <Link to={redirect ? `/register?redirect=${redirect}` : `/redirect`}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
