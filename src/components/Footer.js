import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="text-xs mt-10">
      Powered by Survey Connect &copy; {year} .All rights reserved.{" "}
    </div>
  );
}

export default Footer;
