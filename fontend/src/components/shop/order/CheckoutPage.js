import React, { Fragment } from "react";
import Layout from "../layouts";
import { CheckoutComponent } from "./CheckoutProducts";

const CheckoutPage = (props) => {
  return (
    <Fragment>
      <Layout children={<CheckoutComponent />} />
    </Fragment>
  );
};

export default CheckoutPage;