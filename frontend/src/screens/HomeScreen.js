import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../features/productSlice";
import Loader from "../components/Loader";

function HomeScreen() {
  // const [productsList, setproductsList] = useState([]);
  const { products, isLoading } = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductList());
    //console.log("hello");
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} className="" sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
