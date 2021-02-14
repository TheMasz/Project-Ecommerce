import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  listCategories,
} from "../../../actions/addProductActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { CREATE_PRODUCT_RESET } from "../../../constants/addProductContants";

export default function NewProduct(props) {
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, success, error, product } = productCreate;
  const categoriesList = useSelector((state) => state.categories);
  const {
    loading: CateogoryLoading,
    error: CategoryError,
    categories,
  } = categoriesList;
  const dispatch = useDispatch();
  const render = new FileReader();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [countInStock, setCountInStock] = useState();
  const [price, setPrice] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();
  const [preview1, setPreview1] = useState();
  const [preview2, setPreview2] = useState();
  const [preview3, setPreview3] = useState();
  const [preview4, setPreview4] = useState();

  const ChangeHandler1 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview1(render.result);
    };
    setImg1(file);
  };
  const ChangeHandler2 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview2(render.result);
    };
    setImg2(file);
  };
  const ChangeHandler3 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview3(render.result);
    };
    setImg3(file);
  };
  const ChangeHandler4 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview4(render.result);
    };
    setImg4(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("brand", brand);
    data.append("countInStock", countInStock);
    data.append("price", price);
    data.append("img1", img1);
    data.append("img2", img2);
    data.append("img3", img3);
    data.append("img4", img4);
    dispatch(createProduct(data));
  };
  useEffect(() => {
    dispatch(listCategories());
    if (success) {
      props.history.push("/portal/product/list");
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [dispatch, product, success, props.history]);

  return (
    <div className="container">
      {CateogoryLoading ? (
        <LoadingBox />
      ) : CategoryError ? (
        <MessageBox variant="error">{CategoryError}</MessageBox>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="bg-white product-add-page__general p-3 mt-4">
            <div className="row flex-start my-2">
              <div className="text-wrap ">
                <span>* ชื่อสินค้า</span>
              </div>

              <div className="input_wrap">
                <div className="row ">
                  <input
                    type="text"
                    className="input-wrap_input"
                    required
                    maxLength="30"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="input__suffix">
                    <span className="input__suffix-spilit">
                      {name ? name.length : 0}/30
                    </span>
                  </div>
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
                <div className="select-wrap_inner-large">
                  <select className="input-wrap_select" onChange={(e)=>setCategory(e.target.value)} required>
                  <option value="" selected disabled hidden>กรุณาเลือกหมวดหมู่</option>
                    {categories.map((category) => (
                      <option value={category.name} >{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div className="input-wrap">
              <div className="input-wrap_inner-large">
                <input
                  type="text"
                  className="input-wrap_input"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div> */}
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
                        preview1
                          ? {
                              background: `url(${preview1})`,
                            }
                          : null
                      }
                    >
                      <div className="image_input-inner">
                        <i className="fa fa-2x fa-plus-circle"></i>
                      </div>
                      <input
                        type="file"
                        className="input_img"
                        onChange={(e) => ChangeHandler1(e.target.files[0])}
                      />
                    </div>
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
                        preview2
                          ? {
                              background: `url(${preview2})`,
                            }
                          : null
                      }
                    >
                      <div className="image_input-inner">
                        <i className="fa fa-2x fa-plus-circle"></i>
                      </div>
                      <input
                        type="file"
                        className="input_img"
                        onChange={(e) => ChangeHandler2(e.target.files[0])}
                      />
                    </div>
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
                        preview3
                          ? {
                              background: `url(${preview3})`,
                            }
                          : null
                      }
                    >
                      <div className="image_input-inner">
                        <i className="fa fa-2x fa-plus-circle"></i>
                      </div>
                      <input
                        type="file"
                        className="input_img"
                        onChange={(e) => ChangeHandler3(e.target.files[0])}
                      />
                    </div>
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
                        preview4
                          ? {
                              background: `url(${preview4})`,
                            }
                          : null
                      }
                    >
                      <div className="image_input-inner">
                        <i className="fa fa-2x fa-plus-circle"></i>
                      </div>
                      <input
                        type="file"
                        className="input_img"
                        onChange={(e) => ChangeHandler4(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <p className="my-1">ภาพที่ 3</p>
              </div>
            </div>
          </div>
         
          <div>
            {success ? (
              <MessageBox variant="success">Create Product Success</MessageBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : loading ? (
              <MessageBox variant="loading">Loading...</MessageBox>
            ) : (
              ""
            )}
            <button type="submit" className="primary block">
              บันทึกและเผยแพร่
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
