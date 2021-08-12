import React from "react";
import CoffeeNav from "./CoffeeNav";

const Layout = ({ children }) => {
  return (
    <>
      <CoffeeNav />
      {children}
    </>
  );
};

export default Layout;
