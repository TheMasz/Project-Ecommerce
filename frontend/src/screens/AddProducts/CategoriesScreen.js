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
              <input type="text" minLength="20" maxLength="120" placeholder="ใส่ค่า" required/>
              <div className="input__suffix">
                <span className="input__suffix-spilit">0/120</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
