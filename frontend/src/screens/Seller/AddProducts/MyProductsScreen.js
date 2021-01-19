import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MineProduct } from "../../../actions/addProductActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Sidebar from "../../../components/Sidebar";

export default function MyProductsScreen() {
  const dispatch = useDispatch();
  const mineProductList = useSelector((state) => state.mineProduct);
  const { loading, error, products } = mineProductList;
  useEffect(() => {
    dispatch(MineProduct());
  }, [dispatch]);
  console.log(products);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="app-container ">
      <Sidebar />
      <div className="page-container">
        <div className="container ">
          <div className="product-list-mian bg-white mt-4 p-3">
            <div className="row p-3">
              <div className="col-2 ">สินค้า {products.length} รายการ</div>
              <div className="col-2 "></div>
            </div>
            <div className="product-grid-container">
              <div className="product-items row space-evenly ">
                {products.map((product) => (
                  <div key={product._id} className="card mx-2">
                    <Link to={`/products/product/${product._id}`}>
                      <div className="card_img">
                        <img
                          src={`/uploads/products/${product._id}/${product.images[0].url}`}
                          alt={product.name}
                        />
                      </div>
                    </Link>
                    <div className="card_body">
                      <Link to={`/products/product/${product._id}`}>
                        <div className="text-overflow product-name p-1">
                          {product.name}
                        </div>
                      </Link>
                      <div className="product-info row px-1 ">
                        <div className="price  text-overflow">{product.price} บาท</div>
                        <div className="text-overflow">คลัง {product.countInStock}</div>
                      </div>
                      <div className="product-actions row space-evenly pt-1">
                        <Link to={`/portal/product/${product._id}/edit`}>
                          <i className="fa fa-pencil"></i>
                        </Link>
                        <div>
                          <i className="fa fa-trash"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
