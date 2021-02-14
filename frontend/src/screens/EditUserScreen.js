import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, userInfo } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function EditUserScreen(props) {
  const dispatch = useDispatch();
  const render = new FileReader();
  const userId = props.match.params.id;
  const infoUser = useSelector((state) => state.userInfo);
  const { loading: userLoading, error: userError, user } = infoUser;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [img1, setImg1] = useState();
  const [nameImg1, setNameImg1] = useState();
  const [preview1, setPreview1] = useState();

  useEffect(() => {
  
    if (!user || user._id !== userId) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(userInfo(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setNameImg1(user.avatar);
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(userInfo(userId));
      props.history.push('/');
    }
  }, [dispatch, userId, user, userLoading, successUpdate, props.history]);

  const ChangeHandler1 = (file) => {
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview1(render.result);
    };
    setImg1(file);
    setNameImg1(file.name);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("file", img1);
    data.append("fileName", nameImg1);
    dispatch(updateUser(userId, data));
  };
  return (
    <div className="container">
      {userLoading ? (
        <LoadingBox />
      ) : userError ? (
        <MessageBox variant="danger">{userError}</MessageBox>
      ) : (
        <div className="my-account-section">
          <div className="my-account-section__header">
            <div className="my-account-section__header-title">ข้อมูลของฉัน</div>
            <div className="my-account-section__header-subtitle">
              จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
            </div>
          </div>
          <div className="my-account-profile">
            <div className="my-account-profile__left">
              <div className="input-with-label">
                <div className="input-with-label__label">
                  <label>ชื่อผู้ใช้</label>
                </div>
                <div className="input-with-label__content">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-with-label">
                <div className="input-with-label__label">
                  <label>Email</label>
                </div>
                <div className="input-with-label__content">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button type="button" className="primary" onClick={submitHandler}>
                บันทึก
              </button>
          
            </div>
            <div className="my-account-profile__right">
              <div className="avatar-uploader">
                <div className="avatar-uploader__avatar">
                  <div
                    className="avatar-uploader__avatar-image"
                    style={
                      preview1
                        ? { background: `url(${preview1})` }
                        : user.avatar
                        ? {
                            background: `url('/uploads/users/${user.avatar}')`,
                          }
                        : { background: "url('/assets/icons/user.svg')" }
                    }
                  ></div>
                </div>
              </div>
              <input
                className="avatar-uploader__file-input"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => ChangeHandler1(e.target.files[0])}
              />
              
            </div>
        
          </div>
          {loadingUpdate ? (
            <MessageBox variant="loading">Loading...</MessageBox>
          ) : errorUpdate ? (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          ) : successUpdate ? (
            <MessageBox variant="success">User Updated</MessageBox>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
