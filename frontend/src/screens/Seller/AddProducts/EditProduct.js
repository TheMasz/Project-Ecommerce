import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../actions/addProductActions";
import { detailsProduct } from "../../../actions/productActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../../../constants/addProductContants";

export default function EditProduct(props) {
  const dispatch = useDispatch();
  const render = new FileReader();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [countInStock, setCountInStock] = useState();
  const [price, setPrice] = useState();
  const [nameImg1, setNameImg1] = useState();
  const [nameImg2, setNameImg2] = useState();
  const [nameImg3, setNameImg3] = useState();
  const [nameImg4, setNameImg4] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();
  const [preview1, setPreview1] = useState();
  const [preview2, setPreview2] = useState();
  const [preview3, setPreview3] = useState();
  const [preview4, setPreview4] = useState();
  const [deleteImg1, setDeleteImg1] = useState(false);
  const [deleteImg2, setDeleteImg2] = useState(false);
  const [deleteImg3, setDeleteImg3] = useState(false);
  const [deleteImg4, setDeleteImg4] = useState(false);
  const arr = [nameImg1,nameImg2,nameImg3,nameImg4];
  
  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
      product.images[0] && setNameImg1(product.images[0]);
      product.images[1] && setNameImg2(product.images[1]);
      product.images[2] && setNameImg3(product.images[2]);
      product.images[3] && setNameImg4(product.images[3]);
      
    }
    if (successUpdate) {
      props.history.push("/portal/product/list");
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, productId, product, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("brand", brand);
    data.append("countInStock", countInStock);
    data.append("price", price);
    data.append("file", img1);
    data.append("file", img2);
    data.append("file", img3);
    data.append("file", img4);
    data.append("images", JSON.stringify(arr));
    dispatch(updateProduct(productId, data));

  };

  const ChangeHandler1 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview1(render.result);
    };
    setImg1(file);
    setNameImg1(file.name)
    setDeleteImg1(false);
  };
  const ChangeHandler2 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview2(render.result);
    };
    setImg2(file);
    setNameImg2(file.name)
    setDeleteImg2(false);
  };
  const ChangeHandler3 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview3(render.result);
    };
    setImg3(file);
    setNameImg3(file.name)
    setDeleteImg3(false);
  };
  const ChangeHandler4 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview4(render.result);
    };
    setImg4(file);
    setNameImg4(file.name)
    setDeleteImg4(false);
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="bg-white product-add-page__general p-3 mt-4">
          <div className="row flex-start my-2">
            <div className="text-wrap ">
              <span>* ชื่อสินค้า</span>
            </div>

            <div className="input-wrap">
              <div className="input-wrap_inner-large">
                <input
                  type="text"
                  className="input-wrap_input"
                  required
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row flex-start align-start my-2">
            <div className="text-wrap ">
              <span>* รายละเอียด</span>
            </div>
            <div className="input-wrap">
              <div className="textarea-wrap_inner-large">
                <textarea
                  className="input-wrap_textarea"
                  required
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row flex-start my-2">
            <div className="text-wrap ">
              <span>* หมวดหมู่</span>
            </div>
            <div className="input-wrap">
              <div className="input-wrap_inner-large">
                <input
                  type="text"
                  className="input-wrap_input"
                  required
                  value={category || ""}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row flex-start my-2">
            <div className="text-wrap ">
              <span>* ยี่ห้อ</span>
            </div>
            <div className="input-wrap">
              <div className="input-wrap_inner-large">
                <input
                  type="text"
                  className="input-wrap_input"
                  required
                  value={brand || ""}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white product-add-page__selling p-3 my-2">
          <div className="row flex-start my-2">
            <div className="text-wrap ">
              <span>* คลัง</span>
            </div>

            <div className="input-wrap">
              <div className="input-wrap_inner-large">
                <input
                  type="number"
                  className="input-wrap_input"
                  required
                  value={countInStock || ""}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row flex-start my-2">
            <div className="text-wrap ">
              <span>* ราคา</span>
            </div>

            <div className="input-wrap">
              <div className="input-wrap_inner-large">
                <input
                  type="number"
                  className="input-wrap_input"
                  value={price || ""}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white product-add-page__media p-3 my-2">
          <div className="row space-evenly ">
            <div className="text-center">
              <div className="image-input-wrap">
                <div className="image-input_inner">
                  <div
                    className="image_input-wrap"
                    style={
                      deleteImg1
                        ? { background: "" }
                        : preview1
                        ? { background: `url(${preview1})` }
                        : product.images[0]
                        ? {
                            background: `url('/uploads/products/${productId}/${product.images[0]}')`,
                          }
                        : { background: "" }
                    }
                  >
                    <div className="image_input-inner">
                      <i className="fa fa-2x fa-plus-circle"></i>
                    </div>
                    <input
                      type="file"
                      className="input_img"
                      onChange={(e) => ChangeHandler1(e.target.files[0])}
                      disabled={deleteImg1 === false}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setDeleteImg1(true);
                      setPreview1("");
                    }}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="my-1">ภาพปก</p>
            </div>
            <div className="text-center">
              <div className="image-input-wrap">
                <div className="image-input_inner">
                  <div
                    className="image_input-wrap"
                    style={
                      deleteImg2
                        ? { background: "" }
                        : preview2
                        ? { background: `url(${preview2})` }
                        : product.images[1]
                        ? {
                            background: `url('/uploads/products/${productId}/${product.images[1]}')`,
                          }
                        : { background: "" }
                    }
                  >
                    <div className="image_input-inner">
                      <i className="fa fa-2x fa-plus-circle"></i>
                    </div>
                    <input
                      type="file"
                      className="input_img"
                      onChange={(e) => ChangeHandler2(e.target.files[0])}
                      disabled={deleteImg2 === false}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setDeleteImg2(true);
                      setPreview2("");
                    }}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="my-1">ภาพที่ 1</p>
            </div>
            <div className="text-center">
              <div className="image-input-wrap">
                <div className="image-input_inner">
                  <div
                    className="image_input-wrap"
                    style={
                      deleteImg3
                        ? { background: "" }
                        : preview3
                        ? { background: `url(${preview3})` }
                        : product.images[2]
                        ? {
                            background: `url('/uploads/products/${productId}/${product.images[2]}')`,
                          }
                        : { background: "" }
                    }
                  >
                    <div className="image_input-inner">
                      <i className="fa fa-2x fa-plus-circle"></i>
                    </div>
                    <input
                      type="file"
                      className="input_img"
                      onChange={(e) => ChangeHandler3(e.target.files[0])}
                      disabled={deleteImg3 === false}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setDeleteImg3(true);
                      setPreview3("");
                    }}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="my-1">ภาพที่ 2</p>
            </div>
            <div className="text-center">
              <div className="image-input-wrap">
                <div className="image-input_inner">
                  <div
                    className="image_input-wrap"
                    style={
                      deleteImg4
                        ? { background: "" }
                        : preview4
                        ? { background: `url(${preview4})` }
                        : product.images[3]
                        ? {
                            background: `url('/uploads/products/${productId}/${product.images[3]}')`,
                          }
                        : { background: "" }
                    }
                  >
                    <div className="image_input-inner">
                      <i className="fa fa-2x fa-plus-circle"></i>
                    </div>
                    <input
                      type="file"
                      className="input_img"
                      onChange={(e) => ChangeHandler4(e.target.files[0])}
                      disabled={deleteImg4 === false}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setDeleteImg4(true);
                      setPreview4("");
                    }}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="my-1">ภาพที่ 3</p>
            </div>
          </div>
        </div>
        <div className="bg-white product-add-page__other p-3 my-2">
          <div className="row flex-start my-2">
            <div className="text-wrap ">
              <span>* สภาพ</span>
            </div>
            <div className="input-wrap">
              <div className="select-wrap_inner-large">
                <select className="input-wrap_select">
                  <option>ของใหม่</option>
                  <option>ของมือสอง</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          {successUpdate ? (
            <MessageBox variant="success">Update Succested</MessageBox>
          ) : errorUpdate ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : loadingUpdate ? (
            <MessageBox variant="loading">Loading...</MessageBox>
          ) : (
            ""
          )}
          <button type="submit" className="primary block">
            บันทึกและเผยแพร่
          </button>
        </div>
      </form>
    </div>
  );
}
