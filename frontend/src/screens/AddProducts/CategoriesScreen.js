import React from "react";

export default function CategoriesScreen() {
  return (
    <div className="container py-5">
      <div className="seller-page-section bg-white p-3">
        <div className="seller-page-section__header py-1">
          <h1>เพิ่มสินค้าใหม่</h1>
          <p className="py-1">โปรดเลือกหมวดหมู่ที่เหมาะสมสำหรับสินค้าของคุณ</p>
        </div>
        <div className="row my-2 space-evenly">
          <label>ชื่อสินค้า:</label>
          <div className="input_wrap">
            <div className="row">
              <input
                type="text"
                minLength="20"
                maxLength="120"
                placeholder="ใส่ค่า"
                required
              />
              <div className="input__suffix">
                <span className="input__suffix-spilit">0/120</span>
              </div>
            </div>
          </div>
        </div>
        <div className="seller-page-categories__selector p-1">
          <div className="p-2">
            <div className="row input_wrap-normal p-1">
              <input type="text" placeholder="ชื่อหมวดหมู่"/>
              <div className="input__suffix">
                <span className="input__suffix-spilit"><i className="fa fa-search"></i></span>
              </div>
            </div>
          </div>
          <div className="category-list row space-evenly p-2">
            <ul className="scroll-item">
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
            </ul>
            <ul className="scroll-item">
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
            </ul>
            <ul className="scroll-item">
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
              <li>Yo YO</li>
            </ul>
          </div>
          <div className="row flex-start my-1">
            <p>ที่เลือกในปัจจุบัน:</p>
            <p>test</p>
          </div>
          <button type="button" className="primary block">ต่อไป</button>
        </div>
      </div>
    </div>
  );
}
