import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../../actions/addProductActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";

export default function CategoriesScreen(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("")
  // const categoriesList = useSelector((state) => state.categories);
  // const { loading, error, categories } = categoriesList;

  // useEffect(() => {
  //   dispatch(listCategories());
  // }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push("/portal/product/new");
  };

  // {cate.children.length > 0 ?(<li>{renderCategories(cate.children)}</li>):null}
  return (
    <div className="container py-5">
      <div className="seller-page-section bg-white p-3">
        <div className="seller-page-section__header py-1">
          <h1>เพิ่มสินค้าใหม่</h1>
          <p className="py-1">โปรดเลือกหมวดหมู่ที่เหมาะสมสำหรับสินค้าของคุณ</p>
        </div>
        <form onSubmit={submitHandler}>
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
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="input__suffix">
                  <span className="input__suffix-spilit">
                    {name.length}/120
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="seller-page-categories__selector p-1">
            <div className="p-2">
              <div className="row input_wrap-normal p-1">
                <input type="text" placeholder="ชื่อหมวดหมู่" />
                <div className="input__suffix">
                  <span className="input__suffix-spilit">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="category-list  p-2">
              {/* <ul className="scroll-item"></ul>
                <ul className="scroll-item"></ul>
                <ul className="scroll-item"></ul> */}

              <div className="row my-2 space-evenly">
                <label>หมวดหมู่:</label>
                <div className="input_wrap">
                  <div className="row">
                    <input
                      type="text"
                      minLength="20"
                      maxLength="120"
                      placeholder="ใส่ค่า"
                      required
                      onChange={(e)=>setCategory(e.target.value)}
                    />
                    <div className="input__suffix">
                      <span className="input__suffix-spilit">
                    
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-1 row flex-start category-status">
              <p>ที่เลือกในปัจจุบัน: {category}</p>
            </div>
            <button type="submit" className="primary block">
              ต่อไป
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
