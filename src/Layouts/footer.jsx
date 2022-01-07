import React from "react"
import './footer.css'
const Footer = () => {
  return (
    <footer className="footer text-center">
        <p className="footer-company py-1 my-1">
          Công ty TNHH Thương mại điện tử LTTN Electric{" "}
        </p>
          <img
            src={require("../img/logoLTTN.jpg")}
            alt=""
            width="40px"
            className="rounded-circle"
          />
    </footer>
  )
}

export default Footer
