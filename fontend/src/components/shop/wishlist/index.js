import React, { Fragment } from "react";
import Layout from "../layouts";
import SingleWishProduct from "./SingleWishProduct";

const WishList = () => {
  return (
    <Fragment>
      <Layout children={<SingleWishProduct />} />
    </Fragment>
  );
};

export default WishList;