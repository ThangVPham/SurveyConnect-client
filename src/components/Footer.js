import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return <div>&copy; {year} Survey Connect. All rights reserved. </div>;
}

export default Footer;
