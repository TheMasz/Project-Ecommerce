import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
    <div className="container-footer">
        <div className="footerRow">
            <div className="footer-col">
                <h4>company</h4>
                <ul>
                    <li><Link to="#">about us</Link></li>
                    <li><Link to="#">our services</Link></li>
                    <li><Link to="#">privacy policy</Link></li>
                    <li><Link to="#">affiliate program</Link></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>get help</h4>
                <ul>
                    <li><Link to="#">FAQ</Link></li>
                    <li><Link to="#">shipping</Link></li>
                    <li><Link to="#">returns</Link></li>
                    <li><Link to="#">order status</Link></li>
                    <li><Link to="#">payment options</Link></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>online shop</h4>
                <ul>
                    <li><Link to="#">watch</Link></li>
                    <li><Link to="#">bag</Link></li>
                    <li><Link to="#">shoes</Link></li>
                    <li><Link to="#">dress</Link></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                    <Link to="#"><i className="fa fa-facebook-f"></i></Link>
                    <Link to="#"><i className="fa fa-twitter"></i></Link>
                    <Link to="#"><i className="fa fa-instagram"></i></Link>
                </div>
            </div>
        </div>
    </div>
</footer>
  );
}
