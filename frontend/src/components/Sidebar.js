import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function Sidebar() {
    const [shipToggler, setShipToggler] = useState(false);
    const [productToggler, setProductToggler] = useState(false);
    return (
        <div className="sidebar-container">
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li
              className="sidebar-menu-box"
              onClick={(e) => setShipToggler(!shipToggler)}
            >
              <div className="sidebar-menu-item">
                <div>
                  <i className="fa fa-inbox pr-1"></i>
                  <span>การจัดส่ง</span>
                </div>

                <i
                  className={`fa ${
                    shipToggler ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </div>
              <ul
                className={`sidebar-submenu ${
                  shipToggler ? "submenu-active" : ""
                }`}
              >
                <li className="sidebar-submenu-item ">
                  <Link to="/" className="sidebar-submenu-item-link">
                    <span>คำสั่งซื้อสินค้าของฉัน</span>
                  </Link>
                </li>
                <li className="sidebar-submenu-item ">
                  <Link to="/" className="sidebar-submenu-item-link">
                    <span>การยกเลิก</span>
                  </Link>
                </li>
                <li className="sidebar-submenu-item ">
                  <Link to="/" className="sidebar-submenu-item-link">
                    <span> การคืนเงิน/คืนสินค้า</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className="sidebar-menu-box"
              onClick={(e) => setProductToggler(!productToggler)}
            >
              <div className="sidebar-menu-item">
                <div>
                  <i className="fa fa-inbox pr-1"></i>
                  <span>สินค้า</span>
                </div>

                <i
                  className={`fa ${
                    productToggler ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </div>
              <ul
                className={`sidebar-submenu ${
                  productToggler ? "submenu-active" : ""
                }`}
              >
                <li className="sidebar-submenu-item ">
                  <Link to="/portal/product/list" className="sidebar-submenu-item-link">
                    <span>สินค้าของฉัน</span>
                  </Link>
                </li>
                <li className="sidebar-submenu-item ">
                  <Link to="/portal/product/new" className="sidebar-submenu-item-link">
                    <span>เพิ่มสินค้าใหม่</span>
                  </Link>
                </li>
                <li className="sidebar-submenu-item ">
                  <Link to="/" className="sidebar-submenu-item-link">
                    <span>สินค้าที่ถูกระงับ</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
}
