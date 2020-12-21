import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../actions/addProductActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Tree from "../../components/Tree";

export default function CategoriesScreen() {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories);
  const { loading, error, categories } = categoriesList;
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <div className="container py-5">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="seller-page-section bg-white p-3">
          <div className="seller-page-section__header py-1">
            <h1>เพิ่มสินค้าใหม่</h1>
            <p className="py-1">
              โปรดเลือกหมวดหมู่ที่เหมาะสมสำหรับสินค้าของคุณ
            </p>
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
                <input type="text" placeholder="ชื่อหมวดหมู่" />
                <div className="input__suffix">
                  <span className="input__suffix-spilit">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
           <div className="category-list row space-evenly p-2">
             <Tree data={categories} />
              {/* <ul className="scroll-item">
                {categories.map((item, index) => (
                  <li key={index} className="p-2" >{item.category}</li>
                ))}
              </ul>
              <ul className="scroll-item">
            
              </ul>
              <ul className="scroll-item">
               
              </ul> */}
            </div> 
       
            <div className="row flex-start my-1">
              <p>ที่เลือกในปัจจุบัน:</p>
              <p>test</p>
            </div>
            <button type="button" className="primary block">
              ต่อไป
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

